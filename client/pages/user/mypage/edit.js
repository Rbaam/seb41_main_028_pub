import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { MdExpandMore } from 'react-icons/md';
import {
  getUsernameOverlapVerify,
  patchUserInfo,
} from '../../../module/functionModules';

export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: { username: '', password: '', passwordCheck: '' },
  });
  const [verify, setVerify] = useState({
    usernameVerify: '',
    passwordVerify: '',
    passwordCheckVerify: '',
    agreeVerify: 'fail',
  });
  const [changeUserInfo, setChangeUserInfo] = useState({
    username: { boolean: false, className: '' },
    password: { boolean: false, className: '' },
  });
  const inputDefaultClassName =
    'border h-[35px] text-base w-full rounded-md px-2 pt-[5px] focus:border-mainColor duration-500 outline-0 mb-1';
  const labelDefaultClassName =
    'text-base flex w-full font-semibold mb-1 justify-between';
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,12}$/;
  const usernameRegExp = /[A-Za-z0-9가-힇]{2,20}/;
  const upArrow = 'rotate-180 duration-500';
  const downArrow = 'rotate-0';
  const arrowDirectionHandle = (type) => {
    const verifyBoolean = type + 'Verify';
    if (changeUserInfo[type].boolean === false) {
      setChangeUserInfo({
        ...changeUserInfo,
        [type]: { boolean: true, className: upArrow },
      });
    } else {
      setChangeUserInfo({
        ...changeUserInfo,
        [type]: { boolean: false, className: downArrow },
      });

      setVerify({ ...verify, [verifyBoolean]: '' });
      reset({ [type]: '' });
    }
  };
  const blurHandle = async (verifyBoolean, verifyKey) => {
    if (verifyBoolean) {
      if (verifyKey === 'usernameVerify') {
        const response = await getnOverlapVerify(getValues('username'));
        // if (response === '중복이면') {
        //   setVerify({ ...verify, [verifyKey]: 'overlap' });
        // }
      } else {
        setVerify({ ...verify, [verifyKey]: 'success' });
      }
    } else {
      setVerify({ ...verify, [verifyKey]: 'fail' });
    }
  };
  const checkHandle = () => {
    verify.agreeVerify === 'fail'
      ? setVerify({ ...verify, agreeVerify: 'success' })
      : setVerify({ ...verify, agreeVerify: 'fail' });
  };
  const editUserInfoHandle = async (data) => {
    const { username, password, passwordCheck } = data;
    //회원 가입 비동기 함수 호출 부분 에러가 없다면 로그인 페이지로 연동할 것 그 후 리셋
    if (username === '') {
      //password만 보낼 것
    } else if (password === '') {
      //username만 보낼 것
    }
    if (usernameRegExp.test(username) === false && username !== '') {
      setVerify({ ...verify, usernameVerify: 'fail' });
    }
    if (passwordRegExp.test(password) === false && password !== '') {
      setVerify({ ...verify, passwordVerify: 'fail' });
    }
    if (password !== passwordCheck) {
      setVerify({ ...verify, passwordCheckVerify: 'fail' });
    } else {
      // const response=await patchUserInfo({cookie,userId,username,password});
      //reset();
    }
    console.log(data);
  };
  const onError = (e) => {
    console.log(e);
  };
  return (
    <div className="siginUpContatiner w-full h-screen flex flex-col px-10 items-center pt-20  mx-auto relative">
      <img src="/image/logo.svg" className="mb-[40px]" />
      <form
        className="signUpForm w-full flex flex-col items-center"
        onSubmit={handleSubmit(editUserInfoHandle, onError)}
      >
        <div
          className={`signUpPasswordBox flex flex-col w-full ${
            changeUserInfo.username.boolean === false
              ? 'h-auto mb-1'
              : 'h-[80px] mb-5'
          }`}
        >
          <label
            className={labelDefaultClassName}
            onClick={() => arrowDirectionHandle('username')}
          >
            {changeUserInfo.username.boolean === false
              ? '닉네임 변경'
              : '새 닉네임'}
            <MdExpandMore className={changeUserInfo.username.className} />
          </label>
          {changeUserInfo.username.boolean === false ? null : (
            <input
              className={`${inputDefaultClassName} ${
                verify.usernameVerify === 'fail' ? 'border-subColor' : null
              }`}
              placeholder="2~20자 이내로 입력해주세요"
              {...register('username', {
                onBlur: () => {
                  blurHandle(
                    usernameRegExp.test(getValues('username')),
                    'usernameVerify',
                  );
                },
              })}
              required
            />
          )}

          {verify.usernameVerify === 'fail' ? (
            <span className="block text-subColor text-[13px] h-[13px] ">
              닉네임은 영어/한국어/숫자 중 사용하여 2~20자 입니다.
            </span>
          ) : verify.usernameVerify === 'overlap' ? (
            <span className="block text-subColor text-[13px] h-[13px] ">
              중복된 닉네임 입니다.
            </span>
          ) : null}
        </div>
        <div
          className={`signUpPasswordBox flex flex-col w-full ${
            changeUserInfo.password.boolean === false
              ? 'h-auto mb-1'
              : 'h-[80px] mb-5'
          }`}
        >
          <label
            className={labelDefaultClassName}
            onClick={() => arrowDirectionHandle('password')}
          >
            {changeUserInfo.password.boolean === false
              ? '비밀번호 변경'
              : '새 비밀번호'}
            <MdExpandMore className={changeUserInfo.password.className} />
          </label>
          {changeUserInfo.password.boolean === false ? null : (
            <input
              className={`${inputDefaultClassName} ${
                verify.passwordVerify === 'fail' ? 'border-subColor' : null
              }`}
              id="password"
              autoComplete="off"
              placeholder="영문/숫자/특수문자 혼합 8~12자"
              type="password"
              {...register('password', {
                onBlur: () =>
                  blurHandle(
                    passwordRegExp.test(getValues('password')),
                    'passwordVerify',
                  ),
              })}
              required
            />
          )}

          {verify.passwordVerify === 'fail' ? (
            <span className="block text-subColor text-[13px] h-[13px] justify-self-end">
              영문/숫자/특수문자 혼합 8~12자 입니다.
            </span>
          ) : null}
        </div>
        {changeUserInfo.password.boolean === false ? null : (
          <div className="signUpPasswordCheckBox flex flex-col w-full h-[80px] mb-4">
            <label className={labelDefaultClassName}>새 비밀번호 확인</label>
            <input
              className={`${inputDefaultClassName} ${
                verify.passwordCheckVerify === 'fail' ? 'border-subColor' : null
              }`}
              autoComplete="off"
              placeholder="비밀번호를 한번 더 입력해주세요"
              type="password"
              {...register('passwordCheck', {
                onBlur: () =>
                  blurHandle(
                    getValues('password') === getValues('passwordCheck'),
                    'passwordCheckVerify',
                  ),
              })}
              required
            />
            {verify.passwordCheckVerify === 'fail' ? (
              <span className="block text-subColor text-[13px] h-[13px] ">
                비밀번호가 일치하지 않습니다.
              </span>
            ) : null}
          </div>
        )}

        <div className="flex items-center justify-center w-full mb-6">
          <input
            id="agreeCheck"
            type="checkbox"
            className="w-5 h-5 mr-3 accent-subColor "
            onClick={checkHandle}
          />
          <label
            htmlFor="agreeCheck"
            className="block text-mainColor text-base font-semibold "
          >
            회원 정보를 수정하는 것에 대해 동의합니다.
          </label>
        </div>
        <input
          type="submit"
          value="Edit"
          className="border py-2.5 px-5 text-base font-semibold w-full rounded-md bg-mainColor text-iconColor duration-500 outline-0 mb-1 disabled:opacity-20"
          disabled={
            !Object.values(verify).every((el) => el === 'success') &&
            !(
              verify.usernameVerify === 'success' &&
              verify.passwordVerify === '' &&
              verify.passwordCheckVerify === '' &&
              verify.agreeVerify === 'success'
            ) &&
            !(
              verify.usernameVerify === '' &&
              verify.passwordVerify === 'success' &&
              verify.passwordCheckVerify === 'success' &&
              verify.agreeVerify === 'success'
            )
          }
        />
      </form>
    </div>
  );
}
