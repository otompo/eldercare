import { LogIn, CreateAccount } from "./buttons";
import Fade from "react-reveal/Fade";
import useCallToAction from "../hooks/useCallToAction";

export default function CallToAction() {
  const {
    mainTitle,
    titleOne,
    contentOne,
    titleTow,
    contentTow,
    titleThree,
    contentThree,
    titleFour,
    contentFour,
    callSlogan,
  } = useCallToAction();

  return (
    <>
      <div className="bg-white lg:py-32 relative">
        <div className="slant-right-call"></div>
        <section
        // className="max-width"
        >
          <div className="md:grid grid-cols-2 gap-10 md:place-items-center">
            <div className="md:grid grid-cols-1 gap-10 md:place-items-center">
              <Fade left>
                <article className="px-10">
                  <h2 className="text-slate-800 font-bold text-3xl md:text-4xl mb-2">
                    {mainTitle}
                  </h2>
                  <p className="mb-10 text-slate-700">{callSlogan}</p>
                </article>
                <article>
                  <ul className="flex items-center justify-center">
                    <li className="mr-3">
                      <CreateAccount />
                    </li>
                  </ul>
                </article>
              </Fade>
            </div>

            <div className="md:grid grid-cols-2 gap-10 md:place-items-center px-10">
              <Fade right>
                <article>
                  <h6 className="text-slate-800  text-3xl md:text-4xl mb-4">
                    {titleOne}
                  </h6>
                  <p className="mb-10 text-slate-700">{contentOne}</p>
                </article>

                <article>
                  <h6 className="text-slate-800 text-3xl md:text-4xl mb-4">
                    {titleTow}
                  </h6>
                  <p className="mb-10 text-slate-700">{contentTow}</p>
                </article>

                <article>
                  <h6 className="text-slate-800  text-3xl md:text-4xl mb-4">
                    {titleThree}
                  </h6>
                  <p className="mb-10 text-slate-700">{contentThree}</p>
                </article>

                <article>
                  <h2 className="text-slate-800  text-3xl md:text-4xl mb-4">
                    {titleFour}
                  </h2>
                  <p className="mb-10 text-slate-700">{contentFour}</p>
                </article>
              </Fade>
            </div>
          </div>
        </section>
      </div>

      <div className="slant-left-call"></div>
    </>
  );
}
