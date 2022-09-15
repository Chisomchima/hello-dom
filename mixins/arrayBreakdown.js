export default {
    methods: {
        labPanelNames(e){
            let arr = e
            let newArr = []
            for(let x = 0; x < arr.length; x++){
              newArr.push(arr[x].panel.name)
            }
            let str = newArr.join(', ')
            return str
        },
        imgObvNames(e){
            let arr = e
            let newArr = []
            for(let x = 0; x < arr.length; x++){
              newArr.push(arr[x].img_obv.name)
            }
            let str = newArr.join(', ')
            return str
        }
    }
}