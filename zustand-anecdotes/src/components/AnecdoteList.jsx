import { useAnecdotes, useFilter, useAnecdoteActions } from '../anecdoteStore'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const filter = useFilter()
    const { vote, remove } = useAnecdoteActions()

    const filteredAnecdotes = anecdotes.filter(a =>
        a.content.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div>
            {filteredAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>
                            vote
                        </button>

                        {anecdote.votes === 0 && (
                            <button onClick={() => remove(anecdote.id)}>
                                delete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList