export const formatDate = (timestamp) => {
    const date = new Date(timestamp)

    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

    const formatedDate = `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`
    return formatedDate
}

export const formatUser = (user) => {
    const formatedUser = `${user.surname}.${user.name.slice(1,1)}.${user.patronymic.slice(1,1)}`
    return formatedUser
}
