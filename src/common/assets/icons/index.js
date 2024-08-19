const req = import.meta.globEager('./svg/*.svg')
const svgs = {}
Object.keys(req).map(i => {
    const name = i.replace(/.*\/|\.svg/g, '')
    svgs[name] = i
    return req[i]
})

export const svgNames = Object.keys(svgs).sort((a, b) => a - b)