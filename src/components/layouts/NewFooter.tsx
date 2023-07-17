import * as React from "react";

export default function Footer1(props: any) {

    return (
        <>
            <div className="flex w-fit mt-8 mb-8 gap-20">
                <div>{props?.props?.c_footerdata1?.map((c_footerdata1: any) => {
                    // console.log(img, "544561")
                    return (
                        <>
                            <p className="text-2xl ml-12 text-red">{c_footerdata1.fhead}</p>
                            {c_footerdata1?.fsubdata?.map((subdata1: any) => {
                                return (
                                    <>
                                        <div className="mt-5 font-large ml-12 hover:underline hover:text-red">
                                            <a href={subdata1.link}>{subdata1.label}                                         </a>
                                        </div>
                                    </>
                                )
                            })}

                        </>
                    )
                })}
                </div>
                <div>
                    {props?.props?.c_footerdata2?.map((c_footerdata2: any) => {
                        // console.log(img, "544561")
                        return (
                            <>
                                <p className="text-2xl ml-12 text-red">{c_footerdata2.fhead}</p>
                                {c_footerdata2?.fsubdata?.map((subdata2: any) => {
                                    return (
                                        <>
                                            <div className="mt-5 font-large ml-12 hover:underline hover:text-red">
                                                <a href={subdata2.link}>{subdata2.label}                                            </a>
                                            </div>
                                        </>
                                    )
                                })}

                            </>
                        )
                    })}
                </div>
                <div>
                    {props?.props?.c_footerdata3?.map((c_footerdata3: any) => {
                        // console.log(img, "544561")
                        return (
                            <>
                                <p className="text-2xl ml-12 text-red">{c_footerdata3.fhead}</p>
                                {c_footerdata3?.fsubdata?.map((subdata3: any) => {
                                    return (
                                        <>
                                            <div className="mt-5 font-large ml-12 hover:underline hover:text-red">
                                                <a href={subdata3.link}>{subdata3.label}                                            </a>
                                            </div>
                                        </>
                                    )
                                })}

                            </>
                        )
                    })}
                </div>
                <div className="text">
                    <p className="text-2xl ml-12 text-red">Social</p>
                    {props?.props?.c_footersocialdata?.map((img: any) => {
                        // console.log(img, "544561")
                        return (
                            <>
                                <div className="text mt-2 w-10 ml-[53px] hover:underline hover:text-red">
                                    <a href="#"><img src={img.url} alt="" /></a>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div className="text w-[350px]">
                    {props?.props?.photoGallery?.map((img: any) => {
                        // console.log(img, "544561")
                        return (
                            <>
                                <img src={img.image.url} alt="" />
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
