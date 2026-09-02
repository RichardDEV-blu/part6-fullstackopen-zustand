import { beforeEach, describe, expect, test, vi } from 'vitest'
import anecdoteService from './services/anecdotes'
import useAnecdoteStore from './anecdoteStore'
import { renderHook, render, screen } from '@testing-library/react'
import { useAnecdotes } from './anecdoteStore'
import AnecdoteList from './components/AnecdoteList'

vi.mock('./services/anecdotes')

describe('anecdote store', () => {
    beforeEach(() => {
        useAnecdoteStore.setState({
            anecdotes: [],
            filter: ''
        })
    })

    test('initialized anecdotes with anecdotes returned by the backend', async () => {
        const anecdotes = [
            {
                "content": "If it hurts, do it more often",
                "id": "47145",
                "votes": 1
            },
            {
                "content": "Adding manpower to a late software project makes it later!",
                "id": "21149",
                "votes": 1
            },
            {
                "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
                "id": "69581",
                "votes": 1
            },
            {
                "content": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
                "id": "36975",
                "votes": 1
            },
            {
                "content": "Premature optimization is the root of all evil.",
                "id": "25170",
                "votes": 1
            },
            {
                "content": "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
                "id": "98312",
                "votes": 1
            },
        ]

        anecdoteService.getAll.mockResolvedValue(anecdotes)
        await useAnecdoteStore.getState().actions.initialize()
        const state = useAnecdoteStore.getState()
        expect(state.anecdotes).toEqual(anecdotes)

    })

    test('returns anecdotes sorted by votes', () => {
        useAnecdoteStore.setState(
            {
                anecdotes: [
                    {
                        id: '1',
                        content: 'First anecdote',
                        votes: 3
                    },
                    {
                        id: '2',
                        content: 'Second anecdote',
                        votes: 10
                    },
                    {
                        id: '3',
                        content: 'Third anecdote',
                        votes: 5
                    }
                ]
            }
        )

        const { result } = renderHook(() => useAnecdotes())
        expect(result.current.map(anecdotes => anecdotes.votes)).toEqual([10, 5, 3])


    })

    test('shows anecdotes according to filter', () => {
        useAnecdoteStore.setState({
            anecdotes: [
                {
                    id: '1',
                    content: 'First anecdote',
                    votes: 3
                },
                {
                    id: '2',
                    content: 'Second anecdote',
                    votes: 10
                },
                {
                    id: '3',
                    content: 'Another story',
                    votes: 5
                }
            ],
            filter: 'second'
        })

        render(<AnecdoteList />)

        expect(screen.getByText('Second anecdote')).toBeInTheDocument()
        expect(screen.queryByText('First anecdote')).not.toBeInTheDocument()
        expect(screen.queryByText('Another story')).not.toBeInTheDocument()
    })




})