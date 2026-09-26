import React, { useState, useEffect } from 'react';
import { X, Check, RefreshCw, Link as LinkIcon, Globe, Image as ImageIcon } from 'lucide-react';
import { searchFoodImages } from '../services/imageSearchService';

interface ImageSearchModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export const ImageSearchModal: React.FC<ImageSearchModalProps> = ({
  title,
  isOpen,
  onClose,
  onSelectImage
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [pageOffset, setPageOffset] = useState(0);

  const fetchImagesForOffset = async (offset: number) => {
    setLoading(true);
    try {
      const results = await searchFoodImages(title, 4, offset);
      setImages(results.slice(0, 4));
      if (results.length > 0) {
        setSelectedUrl(results[0]);
      }
    } catch (e) {
      console.error('Google Image search error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleNextFour = () => {
    const nextOffset = pageOffset + 1;
    setPageOffset(nextOffset);
    fetchImagesForOffset(nextOffset);
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedUrl(null);
      setCustomUrlInput('');
      setPageOffset(0);
      setLoading(true);
      searchFoodImages(title, 4, 0).then((results) => {
        setImages(results.slice(0, 4));
        if (results.length > 0) setSelectedUrl(results[0]);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [isOpen, title]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                Changer la photo du plat
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Plat : <span className="font-semibold text-slate-700 dark:text-slate-300">{title}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Google Images Proposals Header & Refresh Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-blue-600" />
            Choisissez une photo parmi les 4 propositions :
          </p>
          <button
            onClick={handleNextFour}
            disabled={loading}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 disabled:opacity-50 shrink-0 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Proposer 4 autres
          </button>
        </div>

        {/* Grid of 4 Google Images */}
        <div className="mb-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <RefreshCw className="w-7 h-7 animate-spin text-blue-500" />
              <p className="text-xs">Chargement des 4 photos Google Images suivantes...</p>
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {images.slice(0, 4).map((url, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedUrl(url);
                    setCustomUrlInput('');
                  }}
                  className={`relative group aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all shadow-xs ${
                    selectedUrl === url
                      ? 'border-blue-600 ring-2 ring-blue-500/40 scale-[0.98]'
                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Option Google Image ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded-md backdrop-blur-xs">
                    Option {idx + 1}
                  </div>
                  {selectedUrl === url && (
                    <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              Aucune photo disponible.
            </div>
          )}
        </div>

        {/* Input field to paste custom image URL */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
            Ou coller un lien d'image personnalisé :
          </label>
          <input
            type="url"
            value={customUrlInput}
            onChange={(e) => {
              const val = e.target.value;
              setCustomUrlInput(val);
              if (val.trim()) setSelectedUrl(val.trim());
            }}
            placeholder="https://..."
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 mt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Annuler
          </button>
          <button
            disabled={!selectedUrl}
            onClick={() => {
              if (selectedUrl) {
                onSelectImage(selectedUrl);
                onClose();
              }
            }}
            className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Check className="w-4 h-4" />
            Appliquer cette photo
          </button>
        </div>
      </div>
    </div>
  );
};
