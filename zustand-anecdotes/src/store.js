import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const asObject = (content) => ({
  content,
  id: Math.round(Math.random() * 1000000),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',

  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes: anecdotes })
    },

    vote: id => set(state => ({
      anecdotes: state.anecdotes.map(anecdote =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    })),

    create: async content => {
      const newObject = {
        content,
        votes: 0
      }

      const anecdote = await anecdoteService.create(newObject)

      set(state => ({
        anecdotes: [...state.anecdotes, anecdote]
      }))
    },

    setFilter: filter => set({ filter })
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export default useAnecdoteStore