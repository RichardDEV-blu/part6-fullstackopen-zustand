import { create } from 'zustand'

const useStore = create((set) => ({
    good: 0,
    neutral: 0,
    bad: 0,

    actions: {

        increaseGood: () => set((state) => ({
            good: state.good + 1
        })),

        increaseNeutral: () => set((state) => ({
            neutral: state.neutral + 1
        })),
        increaseBad: () =>
            set((state) => ({
                bad: state.bad + 1
            }))
    }
}))

export const useGood = () => useStore((state) => state.good)
export const useNeutral = () => useStore((state) => state.neutral)
export const useBad = () => useStore((state) => state.bad)

export const useFeedbackControls = () =>
    useStore((state) => state.actions)

export default useStore