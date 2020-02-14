export default {
    log: (...args: any) => {
        console.log(new Date(), ...args)
    }
}