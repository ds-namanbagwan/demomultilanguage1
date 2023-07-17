import * as React from "react";
import "../index.css";
import { GetHeadConfig, GetPath, HeadConfig, Template, TemplateConfig, TemplateProps, TemplateRenderProps } from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import SearchLayout from "../components/locatorPage/SearchLayout";
import { stagingBaseurl, favicon, AnalyticsEnableDebugging, AnalyticsEnableTrackingCookie } from "../../sites-global/global"
import { JsonLd } from "react-schemaorg";
import { StaticData } from "../../sites-global/staticData";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { AnswerExperienceConfig } from "../config/answersHeadlessConfig";
import Header from "../components/layouts/NewHeader";
import Footer1 from "../components/layouts/NewFooter";

export const config: TemplateConfig = {
  stream: {
    $id: "Locator",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "name",
      "slug"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["h&f"]
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en", "fr", "en_GB"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.locale + "/" + `index.html`;
  // return `/index.html`;
};

// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document.locale}`]; 
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: `${document.c_meta_title ? document.c_meta_title : `Timber Merchants Near Me - Find MGM Timber Branch Locator Here.`}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${document.c_meta_description ? document.c_meta_description : `View Timber Merchants near you today at MGM Timber. We stock high-quality, robust products at competitive rates.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: StaticData.Brandname,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
      //  {
      //    type: "link",
      //    attributes: {
      //      rel: "canonical",
      //      href: `${
      //        document._site.c_canonical?document.c_canonical:stagingBaseurl
      //      }`,
      //    },
      //  },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${document.c_meta_description ? document.c_meta_description : ``}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.c_meta_title ? document.c_meta_title : ``}`,
        },
      },
      // {
      //   type: "meta",
      //   attributes: {
      //     property: "og:image",
      //     content: favicon,
      //   },
      // },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${document.c_meta_description ? document.c_meta_description : `View Timber Merchants near you today at MGM Timber. We stock high-quality, robust products at competitive rates.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:title",
          content: `${document.c_meta_title ? document.c_meta_title : `Timber Merchants Near Me - Find MGM Timber Branch Locator Here.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:image",
          content: favicon
        },
      },
    ],
  };
};

const Locator: Template<TemplateRenderProps> = ({
  document,
  __meta,
}) => {
  const {
    _site
  } = document;
  console.log(document.locale, "locale check karna hai")


  let templateData = { document: document, __meta: __meta };
  const endpoints = {
    universalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission: "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch: "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
  }
  // console.log(document.locale,"jhjtgngjjyjgfhgd");
  return (
    <>
      <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MGM ",
          url: stagingBaseurl,
          logo: favicon,
        }}
      />
      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <Header props={_site} />

          <SearchHeadlessProvider
            experienceKey={AnswerExperienceConfig.experienceKey}
            locale={document.locale}
            apiKey={AnswerExperienceConfig.apiKey}
            verticalKey={AnswerExperienceConfig.verticalKey}
            experienceVersion="STAGING"
            sessionTrackingEnabled={true}
            endpoints={AnswerExperienceConfig.endpoints}
          >

            <SearchLayout _site={_site} />

          </SearchHeadlessProvider>

          <Footer1 props={_site} />
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Locator;