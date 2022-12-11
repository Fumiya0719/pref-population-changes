import axios from '@/assets/plugins/setApiKey'

// 指定されたURL、Configを基に都道府県情報を取得し返却
const getPrefInfo = async (url: string, config: object = {}) => {
    return await axios
        .get(url, config)
        .then((response) => {
            return {
                status: 'success',
                content: response.data.result,
            }
        })
        .catch((error) => {
            console.log(error)
            return {
                status: 'error',
                content: '都道府県情報を取得できませんでした。',
            }
        })
}

export default getPrefInfo
