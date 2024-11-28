import Mapper from "../server/Mapper";
import { cn } from "@/lib/utils";
import { CloudUpload, HardDriveUpload, ShieldAlert } from "lucide-react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Input, InputProps } from "../ui/input";
import { toast as sonner } from "sonner";
import { useEffect } from "react";

interface UploaderProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & InputProps;
  options?: DropzoneOptions;
}

export const Uploader = ({ inputProps, options }: UploaderProps) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, fileRejections, open } = useDropzone({
    ...options,
  });

  const DynamicUI = () => (
    <div className="line-clamp-2 h-[75px] text-center">
      {isDragActive ? (
        isDragAccept ? (
          <>
            <HardDriveUpload className="mx-auto mb-3.5 size-8" strokeWidth={1.5} />
            Drag files or click to upload
          </>
        ) : isDragReject ? (
          <>
            <ShieldAlert className="mx-auto mb-3.5 size-8" strokeWidth={1.5} />
            One or more files not allowed or not supported
          </>
        ) : (
          <>
            <CloudUpload className="mx-auto mb-3.5 size-8" strokeWidth={1.5} />
            Drag files or click to upload
          </>
        )
      ) : (
        <>
          <CloudUpload className="mx-auto mb-3.5 size-8" strokeWidth={1.5} />
          Drag files or click to upload
        </>
      )}
    </div>
  );

  useEffect(() => {
    if (!!fileRejections.length) {
      fileRejections.forEach((fileRejection, index) => {
        const { file, errors } = fileRejection;

        setTimeout(() => {
          sonner.error(
            <blockquote>
              <h5 className="break-all text-sm">
                <strong>Error: </strong>Invalid File <strong>{file.name}</strong>
              </h5>
              <br />
              <ul>
                <Mapper data={Array.from(errors)} render={({ message }) => <li>{message}</li>} />
              </ul>
            </blockquote>,
            { duration: 10000 },
          );
        }, 2000 * index);
      });
    }
  }, [fileRejections]);

  return (
    <div
      className={cn(
        "relative flex h-40 w-full flex-col items-center justify-center border-[1.5px] border-dashed border-slate-300 bg-slate-50 p-7 text-slate-400",
        {
          "border-teal-300 bg-teal-50 text-teal-400": isDragActive && isDragAccept,
          "border-rose-300 bg-rose-50 text-rose-400": isDragActive && isDragReject,
        },
      )}
    >
      <div {...getRootProps()} className="absolute size-full hover:cursor-pointer" onClick={open}>
        <Input {...getInputProps()} {...inputProps} className={cn("hidden", inputProps?.className)} type="file" />
      </div>

      <DynamicUI />
    </div>
  );
};
