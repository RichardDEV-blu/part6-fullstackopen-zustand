import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote, createAnecdote } from '../requests'
import { useNotify } from '../hooks/useNotification'

export const useAnecdotes = () =>
    useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: false,
        refetchOnWindowFocus: false
    })


export const useVoteMutation = () => {
    const queryClient = useQueryClient()
    const notify = useNotify()
    return useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['anecdotes']
            })
            notify('you voted for the anecdote')
        }
    })
}

export const useCreateMutation = () => {
    const queryClient = useQueryClient()
    const notify = useNotify()

    return useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['anecdotes']
            })
            notify('anecdote created')
        },

        onError: () => {
            notify('anecdote creation failed')
        }
    })
}