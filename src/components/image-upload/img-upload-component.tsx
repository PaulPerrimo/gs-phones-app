import * as React from "react";
import { genericReducer, StateReducer } from "../../utilities/utilities";

interface ImgPickerState {
  file: File | null;
  previewUrl: string | ArrayBuffer | null;
  isValid: boolean;
}

const getDefaultValues = (): ImgPickerState => ({ file: null, previewUrl: "", isValid: false });

type ImgUploadProps = {
  disabled?: boolean;
  onInput: (id: string, file: File, fileIsValid: boolean) => void;
  id: string;
  img: File | null;
};

const ImgUpload: React.FC<ImgUploadProps> = ({ onInput, id, disabled, img }) => {
  const [{ file, isValid, previewUrl }, setState] = React.useReducer<StateReducer<ImgPickerState>, ImgPickerState>(
    genericReducer,
    getDefaultValues(),
    getDefaultValues
  );

  const filePickerRef = React.useRef<HTMLInputElement | null>(null);

  const pickImgHandler = () => {
    if (!filePickerRef.current) return;
    filePickerRef.current.click();
  };

  const pickedHandler = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
    let file: any;
    let fileIsValid = isValid;
    if (files?.length === 1) {
      file = files[0];
      setState({ file, isValid: true });
      fileIsValid = true;
    } else {
      setState({ isValid: false });
      fileIsValid = false;
    }
    onInput(id, file, fileIsValid);
  };

  React.useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => setState({ previewUrl: fileReader.result });
    fileReader.readAsDataURL(file);
  }, [file]);

  React.useEffect(() => {
    if (filePickerRef.current && !img) filePickerRef.current.value = "";
  }, [img]);

  return (
    <div className="img-upload">
      <input
        ref={filePickerRef}
        type="file"
        className="img-upload-input"
        accept=".jpg, .png, .jpeg"
        style={{ display: "none" }}
        onChange={pickedHandler}
      />
      <div className="img-upload-items">
        <div className="img-upload-preview">
          {previewUrl && img ? <img height={100} src={previewUrl as string} alt="Preview" /> : "Pick an Image"}
        </div>
        <button disabled={disabled} className="btn" onClick={pickImgHandler}>
          Pick Image
        </button>
      </div>
    </div>
  );
};

ImgUpload.defaultProps = { disabled: false };

export default ImgUpload;
