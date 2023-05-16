import * as React from "react"


export default function Header(props: any) {

    return (
        <>
            <div className="flex">
                <div className="w-72">
                    {props?.props?.photoGallery?.map((img: any) => {
                        // console.log(img, "544561")
                        return (
                            <>
                                <img src={img.image.url} alt="" />
                            </>
                        )
                    })}
                </div>
                <div className="flex ml-10 gap-24 mt-[65px] text-center" style={{ fontSize: "large" }}>
                    {props?.props?.c_header1?.map((data: any) => {
                        // console.log("hui", data)
                        return (
                            <>
                                <a className="hover:underline hover:text-red" href={data.hdata.link}>{data?.hdata?.label}</a>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
