export const STRAPI_BASE_URL = 'http://localhost:1337'

export async function getHeroBanner() {
    const queryHomePage = 'populate[section][on][layout.hero-banner][populate][banner][fields][0]=url&populate[section][on][layout.hero-banner][populate][buttons][populate]'

    const response = await getStrapiData(`/api/home-page?${queryHomePage}`)

    return response?.data 
}

export async function getServicios() {
    const queryServicios = 'populate[section][on][layout.servicios][populate][servicio][populate][icon][fields]=url'

    const response = await getStrapiData(`/api/home-page?${queryServicios}`)

    return response?.data
}

export async function getStrapiData(url: string) {
    try {
        const response = await fetch(`${STRAPI_BASE_URL}${url}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log('Error fetching data:', error)
        return null
    }
}