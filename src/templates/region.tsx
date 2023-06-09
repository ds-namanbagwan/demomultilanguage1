import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import constant from "../constant";
import Banner from "../components/locationDetail/banner";
import PageLayout from "../components/layouts/PageLayout";
import { favicon, stagingBaseurl } from "../../sites-global/global";
import { StaticData } from "../../sites-global/staticData";
import Footer1 from "../components/layouts/NewFooter";
import Header from "../components/layouts/NewHeader";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "region",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      //   "dm_directoryParents.dm_directoryChildrenCount",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.slug",
      //   "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_baseEntityCount",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.address"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_region"],
      savedFilterIds: ["dm_stores-directory_address_region"]
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en", "en_GB", "fr"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url = "";
  document.dm_directoryParents.map((i: any) => {
    if (i.meta.entityType.id == 'ce_country') {
      url += i.slug + "/";
    }
  });
  url += document.slug.toString();
  return document.locale + "/" + url + '.html';
};

export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  // return [`index-old/${document.id.toString()}`];
  return [`index-old/${document.locale + "/" + document.name}`];
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  var canonical = "";
  document.dm_directoryParents.map((entity: any) => {

    canonical = entity.slug.toLowerCase();
  })
  return {
    title: `${document.c_meta_title ? document.c_meta_title : `MGM Stores in ${document.name} | Find a Local Store`}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${document.c_meta_description ? document.c_meta_description : `Use this page to find your nearest MGM store in ${document.name} and discover the location details you need to visit us today.`}`,
        },
      },
      //   {
      //     type: "meta",
      //     attributes: {
      //       name: "title",
      //       content: `${document.c_metaTitle}`,
      //     },
      //   },
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
          name: "keywords",
          content: document.name,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },
      // {
      //   type: "link",
      //   attributes: {
      //     rel: "canonical",
      //     href: `${
      //      stagingBaseurl
      //          ? stagingBaseurl+ canonical + "/" + document.slug + ".html"
      //          : "/" + document.slug + ".html"
      //     }`,
      //   },
      // },
      //   // /og tags
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${stagingBaseurl
            ? stagingBaseurl + canonical + "/" + document.slug + ".html"
            : "/" + document.slug + ".html"
            }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${document.c_meta_description ? document.c_meta_description : `Find MGM Timber Store in ${document.name}. We stock high-quality, robust products at competitive rates.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.name}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: favicon,
        },
      },
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
          name: "twitter:url",
          content: `/${document.slug ? document.slug : `${document.name.toLowerCase()}`}.html`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${document.c_meta_description ? document.c_meta_description : `Find MGM Timber Store in ${document.name}. We stock high-quality, robust products at competitive rates.`}`
        },
      },
    ],
  };
};

const region: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    _site,
    slug,
    address,
    c_banner_image,
    c_bannerHeading,
    dm_directoryParents,
    dm_directoryChildren
  } = document;
  let newurl = "";
  //   const links=document?.slug+"/"+document?.dm_directoryChildren?.slug;
  // console.log('links', links)
  const childrenDivs =
    dm_directoryChildren &&
    dm_directoryChildren?.map((entity: any) => {
      if (entity?.dm_baseEntityCount == 1) {
        newurl = entity.slug;
        entity.dm_directoryChildren.map((detl: any) => {
          var string: any = detl.name.toString();
          // let result: any = string.replaceAll(" ", "-");
          newurl = slug + "/" + newurl + "/" + string.toLowerCase() + ".html";
          //  console.log(newurl,"575524")
        })
        // let slugs =
        //   links+"/" + entity?.dm_directoryChildren[0]?.name.toLowerCase() + ".html";
        // let slug: any = slugs.replaceAll(" ", "-");
        return (
          <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
            <a key={entity.slug} href={newurl} className="hover:text-red">
              {entity.name} ({entity.dm_baseEntityCount})
            </a>
          </div>
        );
      } else {
        // console.log(dm_directoryParents&&dm_directoryParents[1]&&dm_directoryParents[1].slug,'jghhfhhhjhhhhh')
        let slug =
          "/" +
          dm_directoryParents[1]?.slug +
          "/" +
          document.slug +
          "/" +
          entity.slug +
          ".html";
        return (
          <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4 test">
            <a key={entity.slug} href={slug} className="hover:text-red">
              {entity.name} ({entity.dm_baseEntityCount})
            </a>
          </div>
        );
      }
    });

  let bannerimage = c_banner_image && c_banner_image.image.url;
  return (
    <>
      <Header props={_site} />
      <BreadCrumbs
        name={name}
        parents={dm_directoryParents}
        baseUrl={relativePrefixToRoot}
        address={address}
      ></BreadCrumbs>
      {/* <div className="location-dtl">     <Banner name={c_bannerHeading?c_bannerHeading:name} c_bannerImage={bannerimage}  /></div> */}
      <div className="content-list">
        <div className="container">
          <div className="sec-title">
            <h2 style={{ textAlign: "center" }}>
              {name}
            </h2>
          </div>
          <ul className="region-list">
            {childrenDivs}
          </ul>
        </div>
      </div>
      <Footer1 props={_site} />
    </>
  )
}
export default region;
