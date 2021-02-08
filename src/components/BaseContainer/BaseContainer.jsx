import {container} from "./BaseContainer.module.css";
import Head from "next/head";
import PropTypes from "prop-types";

const BaseContainer = ({children, extraKeywords}) => {
  
    let getKeywords = () => {
        let kw = "mercadolibre ecommerce vende compra etc";
        if (extraKeywords/* && Array.isArray(extraKeywords)*/) kw += ` ${extraKeywords.toString()}`;
        return kw;
    };

    return (
        <div className={container}>
            <Head>
                <title>Meli Challenge</title>
                
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet="utf-8"/>
                <meta name="description" content="Mercado Libre Challenge - Franco Galuzzi"/>
                <meta name="keywords" content={getKeywords()}/>
                <meta name="author" content="Franco Galuzzi" />
                <meta name="copyright" content="MercadoLibre" />
                <meta name="robots" content="index, follow"/>
                {/* no estoy seguro si vale la pena por el ssr, ver cachear el response express */}
                <meta httpEquiv="cache-control" content="no-cache"/> 
            </Head>
            <>
                {children}
            </>
            <style jsx global>{`
                body, html {
                    height: 100%;
                    margin: 0px; padding: 0px;
                    overflow-y: hidden;
                    position: relative;
                }
            `}</style>
        </div>
    );
};

BaseContainer.propTypes = {
    children: PropTypes.any,
    extraKeywords: PropTypes.array
};


export default BaseContainer;