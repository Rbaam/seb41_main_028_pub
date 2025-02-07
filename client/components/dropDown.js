import { useEffect, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';

export function DropDown() {
  const [arrowDirection, setArrowDirection] = useState({
    className: '',
    boolean: false,
  });
  const [isPostUser, setIsPostUser] = useState(true);
  const upArrow = 'rotate-180 duration-500';
  const downArrow = 'rotate-0';
  const arrowDirectionHandle = () => {
    if (arrowDirection.boolean === false) {
      setArrowDirection({ className: upArrow, boolean: true });
    } else {
      setArrowDirection({ className: downArrow, boolean: false });
    }
  };

  //props로 넘겨받는거에서 인증글이냐,리뷰냐 판단하여 비동기 함수 조건부 호출
  const declarationHandle = () => {
    //신고하기 호출
  };
  const deleteAuthHandle = () => {
    //삭제하기 호출
  };
  useEffect(() => {
    //만약 글을 작성한 사람이면 isPostUser를 true 값으로 바꿔준다.
    //setIsPostuser(true);
  }, []);
  return (
    <div className="flex flex-col absolute right-3 top-5 w-20 items-end">
      <MdExpandMore
        className={arrowDirection.className}
        onClick={arrowDirectionHandle}
      />
      {arrowDirection.boolean === false ? null : (
        <div className="flex flex-col w-full ">
          <span
            className="text-[10px] border border-subColor  bg-white text-center"
            onClick={declarationHandle}
          >
            신고하기
          </span>
          {isPostUser === true ? (
            <span
              className="text-[10px] border-x border-b border-subColor  bg-white  text-center"
              onClick={deleteAuthHandle}
            >
              삭제하기
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
