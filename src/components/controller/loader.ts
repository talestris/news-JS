interface UrlOptions {
    apiKey?: string;
    sources?: string;
    q?: string;
    category?: string;
    language?: string;
    country?: string;
    [key: string]: string | undefined;
}

interface RequestOptions {
    endpoint: string;
    options?: UrlOptions;
}

type Callback<T> = (data: T) => void;

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
}

class Loader {
    private baseLink: string;
    private options: UrlOptions;

    constructor(baseLink: string, options: UrlOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: RequestOptions,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Readonly<UrlOptions>, endpoint: string): string {
        const urlOptions: Partial<UrlOptions> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: HttpMethod, endpoint: string, callback: Callback<T>, options: Readonly<UrlOptions> = {}): void {
        fetch(this.makeUrl(options, endpoint), {
            method,
            headers: {
                'X-Api-Key': this.options.apiKey ?? '',
            },
        })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
