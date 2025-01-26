import create from "zustand";

const [useStore] = create(set => ({
  width: window.innerWidth,
  height: window.innerHeight,
  setSize: ({ width, height }) => set({ width, height }),

  imageWidth: 100,
  imageHeight: 100,

  setImageSize: size =>
    set(() => ({ imageWidth: size.width, imageHeight: size.height })),
  scale: 1,
  setScale: scale => set({ scale }),
  isDrawing: false,
  toggleIsDrawing: () => set(state => ({ isDrawing: !state.isDrawing })),

  regions: [],
  setRegions: regions => set(state => ({ regions })),

  selectedRigionId: null,
  selectRegion: selectedRigionId => set({ selectedRigionId }),

  brightness: 0,
  setBrightness: brightness => set({ brightness })
}));

export default useStore;
