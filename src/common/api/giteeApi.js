import axios from 'axios';

class GiteeApi {
    constructor(options = {}) {
        this.owner = options.owner || 'wu_yongshun'; // 仓库所有者
        this.repo = options.repo || 'wu_yongshun';   // 仓库名称
        this.token = options.token || '0862e88096c4d431d2427172bba527fc'; // 个人访问令牌
        this.baseURL = 'https://gitee.com/api/v5';
    }

    // 设置配置
    setConfig(config) {
        Object.assign(this, config);
    }

    // 获取文件内容
    async getFileContent(path, ref = 'master') {
        try {
            const url = `${this.baseURL}/repos/${this.owner}/${this.repo}/contents/${path}`;
            const params = {
                ref,
                access_token: this.token
            };

            const response = await axios.get(url, { params });

            if (response.content) {
                // 解码 base64 内容
                const content = this.decodeBase64(response.content);
                return {
                    content,
                    sha: response.sha,
                    path: response.path,
                    name: response.name
                };
            }

            return response;
        } catch (error) {
            console.error('获取文件失败:', error);
            throw error;
        }
    }

    // 获取 JSON 文件
    async getJsonFile(path, ref = 'master') {
        const fileData = await this.getFileContent(path, ref);
        try {
            return JSON.parse(fileData.content);
        } catch (parseError) {
            throw new Error(`JSON 解析失败: ${parseError.message}`);
        }
    }

    // 获取 Markdown 文件
    async getMarkdownFile(path, ref = 'master') {
        const fileData = await this.getFileContent(path, ref);
        return fileData.content;
    }

    

    // 获取目录下的文件列表
    async getDirectoryContents(path = '', ref = 'master') {
        try {
            const url = `${this.baseURL}/repos/${this.owner}/${this.repo}/contents/${path}`;
            const params = {
                ref,
                access_token: this.token
            };

            const response = await axios.get(url, { params });
            return response.data;
        } catch (error) {
            console.error('获取目录内容失败:', error);
            throw error;
        }
    }

    // Base64 解码
    decodeBase64(str) {
        try {
            // 移除可能的换行符和空格
            const base64 = str.replace(/\s/g, '');
            return decodeURIComponent(escape(atob(base64)));
        } catch (error) {
            // 如果解码失败，尝试直接 atob
            return atob(str.replace(/\s/g, ''));
        }
    }

    // 获取 raw 内容（备用方案）
    async getRawContent(path, branch = 'master') {
        try {
            const url = `https://gitee.com/${this.owner}/${this.repo}/raw/${branch}/${path}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('获取 raw 内容失败:', error);
            throw error;
        }
    }
}

// 创建单例实例
export const giteeApi = new GiteeApi();

// 也可以导出类以便创建多个实例
export default GiteeApi;