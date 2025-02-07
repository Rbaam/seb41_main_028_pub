import axios from 'axios';
/*사용하는 방법 
1. 쓰고자하는 함수를 찾는다
2. 사용하고자하는 페이지에서 import 해온다
3. 데이터를 입맛에 맞게 넣는다.
4. then 뒷부분 console.log 로 받아오는 데이터를 확인한다.
5. 확인 후 리턴해야 할 값을 명확히 적는다.
6. 끝 */
export async function postUserSignUp({ email, username, password }) {
  try {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        email,
        username,
        password,
      })
      .then((res) => res.status);
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function getUserEmailOverlapVerify(email) {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${email}/exists`)
      .then((res) => console.log(res));
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function getUsernameOverlapVerify(username) {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${username}/exists`)
      .then((res) => console.log(res));
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function getUserInfo({ cookie, userId }) {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
      .then((res) => console.log(res));
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function patchUserInfo({ cookie, userId, username, password }) {
  try {
    const response = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`,
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        },
      )
      .then((res) => console.log(res));
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function getAllAuth(cookie, page, size) {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auths`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
      .then((res) => console.log(res));
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function getAllChallenges(page, size) {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/challenges`)
      .then((res) => console.log(res));
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function postChallenge({ cookie, userId, habitId }) {
  try {
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/challenges`,
        {
          userId,
          habitId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        },
      )
      .then((res) => console.log(res));
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function getChallengeAuths(cookie) {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auths`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
      .then((res) => console.log(res));
    return response;
  } catch (e) {
    console.error(e);
  }
}
