export default {
    preset: "ts-jest",
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // 处理样式文件
    },
}