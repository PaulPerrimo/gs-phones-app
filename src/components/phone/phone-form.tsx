import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { createPhone } from "../../api/api-methods";
import { Phone } from "../../api/models/Phone";
import { NewState } from "../../utilities/utilities";
import ImgUpload from "../image-upload/img-upload-component";

const getDefaultValues = (): Phone => ({
  color: "",
  description: "",
  imageFileName: "",
  manufacturer: "",
  name: "",
  price: 0,
  ram: 0,
  processor: "",
  screen: "",
});

type StateReducer = (state: Phone, newState: NewState<Phone>) => Phone;

const reducer = (state: Phone, newState: NewState<Phone>): Phone =>
  typeof newState === "function" ? newState(state) : { ...state, ...newState };

const PhoneForm: React.FC = () => {
  const history = useHistory();
  const [state, setState] = React.useReducer<StateReducer, Phone>(reducer, getDefaultValues(), getDefaultValues);
  const [imgFile, setImgFile] = React.useState<File | null>();
  const { mutate } = useMutation((update: Phone = state) => (imgFile ? createPhone({ ...update, img: imgFile }) : createPhone(update)), {
    onSuccess: ({ phone, ...rest }) => {
      console.log({ phone, ...rest });
      phone && history.push(`phone/${phone.id}`);
    },
  });

  const { color, description, imageFileName, manufacturer, name, price, ram, processor, screen } = state;

  const isValid = () => color && description && (imageFileName || imgFile) && manufacturer && name && price && ram && processor && screen;

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    isValid() && mutate(state);
  };

  const changeHandler = ({ target: { value, name } }: React.ChangeEvent<HTMLInputElement>) => setState({ [name]: value });

  const imgPickerHandler = (id: string, file: File, fileIsValid: boolean) => {
    console.log({ id, file, fileIsValid });
    setImgFile(file);
  };

  const onReset = () => setState(getDefaultValues());

  return (
    <div className="detailed-container">
      <button className="btn" onClick={() => history.push("/")}>
        ⬅ Go Back
      </button>
      <div className="card phone-item">
        <form onSubmit={onSubmit} className="phone-form">
          <label htmlFor="name-i">Name</label>
          <input type="text" className="field" id="name-id" placeholder="Name" value={name} name="name" onChange={changeHandler} />
          <label htmlFor="manufacturer-i">Manufacturer</label>
          <input
            type="text"
            className="field"
            id="manufacturer-id"
            placeholder="Manufacturer"
            value={manufacturer}
            name="manufacturer"
            onChange={changeHandler}
          />
          <label htmlFor="price-id">Price</label>
          <input
            type="number"
            className="field"
            id="price-id"
            placeholder="Price"
            value={price || ""}
            name="price"
            onChange={changeHandler}
          />
          <label htmlFor="description-id">Description</label>
          <input
            type="text"
            className="field"
            id="description-id"
            placeholder="Description"
            value={description}
            name="description"
            onChange={changeHandler}
          />
          <label htmlFor="color-id">Color</label>
          <input type="text" className="field" id="color-id" placeholder="Color" value={color} name="color" onChange={changeHandler} />
          <ImgUpload disabled={!!imageFileName} id="form-img" onInput={imgPickerHandler} />
          <input
            disabled={!!imgFile}
            type="text"
            className="field"
            id="imageFileName-id"
            placeholder="Link to an image"
            value={imageFileName}
            name="imageFileName"
            onChange={changeHandler}
          />
          <label htmlFor="ram-id">Ram</label>
          <input
            type="number"
            className="field"
            id="ram-id"
            placeholder="Ram in GB"
            value={ram || ""}
            name="ram"
            onChange={changeHandler}
          />
          <label htmlFor="processor-id">Processor</label>
          <input
            type="text"
            className="field"
            id="processor-id"
            placeholder="Processor"
            value={processor}
            name="processor"
            onChange={changeHandler}
          />
          <label htmlFor="screen-i">Screen</label>
          <input type="text" className="field" id="screen-id" placeholder="Screen" value={screen} name="screen" onChange={changeHandler} />
        </form>
      </div>
      <div className="form-buttons">
        <button onClick={onReset} type="reset" className="btn edit">
          Reset 🆑
        </button>
        <button onClick={onSubmit} type="submit" disabled={!isValid()} className="btn edit">
          Save 💾
        </button>
      </div>
    </div>
  );
};
export default PhoneForm;
