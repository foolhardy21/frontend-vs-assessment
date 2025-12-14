const FileNode = ({ id }) => {

    return (
        <>
            <div className="text-center w-full text-[12px] text-black bg-tertiary rounded py-1 border border-tertiary">
                <span>{id}</span>
            </div>
        </>
    );
}
export default FileNode