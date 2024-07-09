import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const DynamicHeader = () => {
    const [headerData, setHeaderData] = useState(null);

    const fetchHeaderData = async () => {
        try {
            const response = await fetch("https://bouboulena.com/admin/api/BgOptions");
            const data = await response.json();
            const dataMap = data.siteinfo.reduce((acc, item) => {
                acc[item.name] = item.value;
                return acc;
            }, {});
            setHeaderData(dataMap);
        } catch (error) {
            console.error('Error fetching header data:', error);
        }
    };

    useEffect(() => {
        fetchHeaderData();
    }, []);

    if (!headerData) {
        return null;
    }
    console.log(headerData)

    const { sitelogo, sitetitle, favicon, ogtitle, ogdescription, ogimage } = headerData;
    console.log(sitelogo)

    return (
        <>
            <Helmet>
                <title>{sitetitle || 'Default Title'}</title>
                <link rel="icon" href={favicon || 'default-favicon.ico'} />
                <meta property="og:title" content={ogtitle || 'Default OG Title'} />
                <meta property="og:description" content={ogdescription || 'Default OG Description'} />
                <meta property="og:image" content={ogimage || 'default-og-image.png'} />
            </Helmet>
            <div>DynamicHeader</div>
            {ogimage && <img id="site-logo" src={`https://bouboulena.com/admin/${ogimage}`} alt="Site Logo" />}
        </>
    );
};

export default DynamicHeader;
