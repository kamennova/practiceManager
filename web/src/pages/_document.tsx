import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import * as React from "react";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap"
                      rel="stylesheet"/>
            </Head>
            <body>
            <Main/>
            <div className={'absolute z-50 w-full top-0 left-0 '} id={'modal-container'}>
                <div id={'modal-bg-layer'} className={'w-full h-full absolute left-0 top-0'}/>
            </div>
            <NextScript/>
            </body>
            </Html>
        )
    }
}

export default MyDocument
