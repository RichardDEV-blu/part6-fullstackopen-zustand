import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote, createAnecdote } from '../requests'

export const useAnecdotes = () =>
    useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: false,
        refetchOnWindowFocus: false
    })


export const useVoteMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['anecdotes']
            })
        }
    })
}

export const useCreateMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['anecdotes']
            })
        }
    })
}