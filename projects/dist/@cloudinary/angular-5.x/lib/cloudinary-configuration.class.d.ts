export default interface CloudinaryConfiguration {
    readonly cloud_name: string;
    readonly upload_preset?: string;
    readonly api_key?: string;
    readonly api_secret?: string;
    readonly cdn_subdomain?: string;
    readonly cname?: string;
    readonly private_cdn?: string;
    readonly protocol?: string;
    readonly resource_type?: string;
    readonly responsive_class?: string;
    readonly responsive_use_breakpoints?: boolean;
    readonly responsive_width?: string;
    readonly round_dpr?: true;
    readonly secure?: boolean;
    readonly secure_cdn_subdomain?: boolean;
    readonly secure_distribution?: string;
    readonly shorten?: boolean;
    readonly type?: string;
    readonly url_suffix?: string;
    readonly use_root_path?: boolean;
    readonly version?: string;
    readonly client_hints?: boolean;
}
