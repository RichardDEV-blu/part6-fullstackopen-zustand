import { create } from 'zustand'
import anecdoteService from './services/anecdotes'
import notificationStore from './notificationStore'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',

  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes: anecdotes })
    },

    vote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)


      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }

      const returnedAnecdote = await anecdoteService.update(
        id,
        updatedAnecdote
      )

      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? returnedAnecdote : a)
      }))

      notificationStore.getState().actions.showNotification(
        `You voted for '${anecdote.content}'`
      )
    },

    create: async content => {
      const newObject = {
        content,
        votes: 0
      }

      const anecdote = await anecdoteService.create(newObject)

      set(state => ({
        anecdotes: [...state.anecdotes, anecdote]
      }))

      notificationStore.getState().actions.showNotification(
        `created '${anecdote.content}'`
      )
    },
    remove: async id => {
      const anecdote = get().anecdotes.find(a => a.id === id)

      if (anecdote.votes !== 0) {
        return
      }

      await anecdoteService.remove(id)

      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },

    setFilter: filter => set({ filter })
  },
}))

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export default useAnecdoteStore