import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonical?: string;
    type?: 'website' | 'article';
    image?: string;
}

export default function SEO({
    title,
    description,
    keywords,
    canonical,
    type = 'website',
    image = '/image.png' // Default to the hero image if none provided
}: SEOProps) {
    const siteTitle = 'Prestige Barbershop';
    const fullTitle = `${title} | ${siteTitle}`;

    // Ensure absolute URL for OG image if possible, but relative works for now if domain unknown
    // In production, this should ideally be a full URL
    const metaImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
}
