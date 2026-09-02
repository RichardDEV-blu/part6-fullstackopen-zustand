import { useAnecdoteActions } from '../anecdoteStore'

const AnecdoteForm = () => {
    const { create } = useAnecdoteActions()

    const createAnecdote = event => {
        event.preventDefault()

        const content = new FormData(event.target).get('content')
        create(content)

        event.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>

            <form onSubmit={createAnecdote}>
                <div>
                    <input name="content" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm