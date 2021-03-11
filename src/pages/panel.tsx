import React from "react"

type PanelProps = {
    summary: React.ReactNode
}

const Panel: React.FC<PanelProps> = ({ summary, children }) => {
    return (
        <div className="mx-5 row">
            <div className="col-8">{React.Children.map(children, (c) => c)}</div>
            <div className="col m-3 alert alert-info">{summary}</div>
        </div>
    )
}

export default Panel
