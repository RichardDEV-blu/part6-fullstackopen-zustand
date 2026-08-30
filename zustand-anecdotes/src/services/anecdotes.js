const baseUrl = 'http://localhost:3001/anecdotes'

const ensureSuccess = response => {
    if (!response.ok) {
        throw new Error(`Request failed (${response.status} ${response.statusText})`)
    }

    return response
}

const getAll = async () => {
    const response = await fetch(baseUrl)
    const data = await ensureSuccess(response).json()
    return data
}

const create = async newObject => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObject)

    })

    const data = await ensureSuccess(response).json()
    return data

}

const update = async (id, newObject) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObject)

    })

    const data = await ensureSuccess(response).json()

    return data

}

const remove = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    })

    ensureSuccess(response)
}

export default { getAll, create, update, remove }
