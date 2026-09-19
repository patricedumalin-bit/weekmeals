import jsPDF from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { Recipe, Ingredient, IngredientCategory, WeeklyPlan, CustomShoppingItem } from '../types';
import { calculateShoppingList, formatQuantity } from './calculator';

export const handlePdfPrint = async (
  type: 'planning' | 'shopping' | 'both',
  weeklyPlan: WeeklyPlan,
  recipes: Recipe[],
  ingredients: Ingredient[],
  ingredientCategories: IngredientCategory[],
  customItems: CustomShoppingItem[],
  language: string = 'fr',
  t: (key: string) => string = (k) => k, // Minimal fallback
  translateMealLabel: any = (n: any, l: any) => l || `Repas ${n}`,
  translateRecipe: any = (r: any) => r,
  translateIngredientCategory: any = (id: any, n: any) => n,
  translateIngredient: any = (id: any, n: any) => n,
  translateUnit: any = (u: any) => u
) => {
    console.log(`Démarrage de la génération de PDF (${type}) par tracé vectoriel...`);

    try {
      if (!weeklyPlan) return;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let y = 15;

      const checkPageBreak = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - 15) {
          pdf.addPage();
          y = 15;
          return true;
        }
        return false;
      };

      const locale = language === 'fr' ? 'fr-FR' : (language === 'de' ? 'de-DE' : (language === 'es' ? 'es-ES' : (language === 'pt' ? 'pt-BR' : 'en-US')));
      const dateStr = new Date().toLocaleDateString(locale, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

      const recipeMap = new Map<string, Recipe>(recipes.map(r => [r.id, r]));

      const { groupedByCategory, totalItemsCount: itemsCount } = calculateShoppingList(
        weeklyPlan,
        recipes,
        ingredients,
        ingredientCategories,
        {},
        customItems
      );

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(16, 185, 129);

      let title = t('printTitle') || 'Meal Plan & Grocery List';
      if (type === 'planning') title = t('printMealScheduleHeader')?.replace(/^\d+\.\s*/, '') || 'Planned Meals Schedule';
      if (type === 'shopping') title = t('printShoppingHeader')?.replace(/^\d+\.\s*/, '') || 'Grocery Shopping List';

      pdf.text(title, 14, y);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(100, 116, 139);
      y += 6;
      pdf.text(`Généré le : ${dateStr}`, 14, y);

      const statsText = type === 'both'
        ? `${weeklyPlan.numberOfMeals} Repas • ${weeklyPlan.defaultServings} Pers. • ${itemsCount} Articles`
        : (type === 'planning' ? `${weeklyPlan.numberOfMeals} Repas • ${weeklyPlan.defaultServings} Pers.` : `${itemsCount} Articles`);

      pdf.text(statsText, pageWidth - 14 - pdf.getTextWidth(statsText), y);

      y += 4;
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.3);
      pdf.line(14, y, pageWidth - 14, y);
      y += 8;

      if (type === 'planning' || type === 'both') {
        checkPageBreak(15);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(30, 41, 59);
        pdf.text(t('printMealScheduleHeader') || '1. Planned Meals Schedule', 14, y);
        y += 5;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);

        for (const meal of weeklyPlan.meals) {
          const assigned = (meal.recipeIds || []).map(id => recipeMap.get(id)).filter((r): r is Recipe => Boolean(r));
          const displayLabel = translateMealLabel(meal.mealNumber, meal.label);

          const requiredHeight = Math.max(1, assigned.length) * 5 + 4;
          checkPageBreak(requiredHeight);

          pdf.setFillColor(248, 250, 252);
          pdf.rect(14, y - 4, pageWidth - 28, requiredHeight, "F");

          pdf.setFont("helvetica", "bold");
          pdf.setTextColor(15, 23, 42);
          pdf.text(`${displayLabel} (${meal.servings}p) :`, 16, y);

          pdf.setFont("helvetica", "normal");
          pdf.setTextColor(51, 65, 85);

          if (assigned.length === 0) {
            pdf.setFont("helvetica", "italic");
            pdf.setTextColor(148, 163, 184);
            pdf.text(t('noRecipeAssignedPrint') || 'Aucune recette', 65, y);
            pdf.setFont("helvetica", "normal");
            y += 5;
          } else {
            let first = true;
            for (const r of assigned) {
              const locRecipe = translateRecipe(r);
              if (!first) {
                checkPageBreak(5);
                pdf.setFillColor(248, 250, 252);
                pdf.rect(14, y - 4, pageWidth - 28, 5, "F");
              }
              pdf.text(`• ${locRecipe.title}`, 65, y);
              first = false;
              y += 5;
            }
          }
          y += 1;
        }
        y += 6;
      }

      if (type === 'shopping' || type === 'both') {
        checkPageBreak(15);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(30, 41, 59);
        pdf.text(t('printShoppingHeader') || '2. Categorized Grocery Shopping List', 14, y);
        y += 6;

        for (const group of groupedByCategory) {
          const catName = translateIngredientCategory(group.category.id, group.category.name);

          checkPageBreak(10);
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(10);
          pdf.setTextColor(16, 185, 129);
          pdf.text(catName.toUpperCase(), 14, y);
          y += 4;

          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(9.5);
          pdf.setTextColor(51, 65, 85);

          for (const item of group.items) {
            const ingName = translateIngredient(item.ingredientId, item.ingredientName);
            const qtyText = `${formatQuantity(item.totalQuantity)} ${translateUnit(item.unit)}`;

            checkPageBreak(5);
            pdf.setDrawColor(71, 85, 105);
            pdf.setLineWidth(0.2);
            pdf.rect(15, y - 3, 3, 3);

            pdf.setFont("helvetica", "bold");
            pdf.text(qtyText, 21, y);

            pdf.setFont("helvetica", "normal");
            pdf.text(ingName, 21 + pdf.getTextWidth(qtyText) + 2, y);

            y += 5;
          }
          y += 2;
        }
      }

      checkPageBreak(10);
      y = Math.min(y + 5, pageHeight - 15);
      pdf.setDrawColor(226, 232, 240);
      pdf.line(14, y, pageWidth - 14, y);
      y += 4;
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      const footerText = "Planifié avec WeekMeals - Vos recettes, votre semaine, votre liste.";
      pdf.text(footerText, (pageWidth - pdf.getTextWidth(footerText)) / 2, y);

      const fileName = `planning_weekmeals_${new Date().toISOString().slice(0, 10)}.pdf`;

      if (Capacitor.isNativePlatform()) {
        const pdfBase64 = pdf.output('datauristring').split(',')[1];
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: pdfBase64,
          directory: Directory.Cache
        });
        await Share.share({
          title: 'Mon Planning WeekMeals',
          text: 'Voici mon planning de repas et ma liste de courses.',
          url: savedFile.uri,
          dialogTitle: 'Partager / Imprimer mon planning'
        });
        return;
      }

      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], fileName, { type: 'application/pdf' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'WeekMeals - Planning & Courses',
            text: 'Voici mon planning de repas et ma liste de courses.',
          });
          return;
        } catch (shareErr: any) {
          if (shareErr.name === 'AbortError') return;
        }
      }

      pdf.save(fileName);

    } catch (err: any) {
      console.error('Erreur génération PDF:', err);
      alert("Erreur lors de la création du PDF.");
    }
  };
