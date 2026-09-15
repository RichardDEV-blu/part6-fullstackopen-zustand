import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote, createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

export const useAnecdotes = () =>
    useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: false,
        refetchOnWindowFocus: false
    })


export const useVoteMutation = () => {
    const queryClient = useQueryClient()
    const { notify } = useContext(NotificationContext)
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

    const { notify } = useContext(NotificationContext)

    return useMutation({
        mutationFn: createAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['anecdotes']
            })
            notify('anecdote created')
        }
    })
}