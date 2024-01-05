export function formatData(rawData) {
    const data = rawData.result
    const statusCode = rawData.statusCode
    if (statusCode !== 200) {
        return {
            totalOperation: 0,
            commitOperation: 0,
            PRIssueOperation: 0,
            latestMoment: '00:00',
            favoriteRepo: '',
            label: '',
            languageRanking: [],
            imgUrl: '',
            repoTopic: 0,
            statusCode: statusCode,
        }
    } else {
        const tmp = data.later_time.split('-')
        const latestMoment = `${tmp[tmp.length - 3]}:${tmp[tmp.length - 2]}`
        return {
            totalOperation: data.total_operate,
            commitOperation: data.commit_operate,
            PRIssueOperation: data.issue_and_pullrequest,
            latestMoment: latestMoment,
            favoriteRepo: data.favorite_repo,
            label: data.label.split('\"')[3],
            languageRanking: Object.entries(data.language_ranking).map(item => {return { name: item[0], value: item[1] }}),
            imgUrl: data.img_url,
            repoTopic: data.topic_total,
            statusCode: statusCode,
        }
    }
}
