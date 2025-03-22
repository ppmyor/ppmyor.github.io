---
category: "dev"
title: "Enum에 대하여"
featuredImage: "typescript-cover.png"
description: "너어, 자꾸 그러면 이놈 아저씨가 enum 한다"
date: "2025-03-22"
tags: ["typescript", "enum"]
---

## 시작하며

해당 글은 enum을 공부하면서 누군가에게 도움이 되고자 눌러 담은 글입니다. 글의 내용이 미비하거나 틀린 부분이 있을 수 있습니다. [해당 레포지토리](https://github.com/ppmyor/ppmyor.github.io)의 이슈에 수정되어야 할 내용을 등록해주시면 감사히 글에 반영하겠습니다.

## Enum 이란

`enum` 이란 `Enumeration`의 약자로 열거형이라고 불리며 여러 언어에 속한 개념입니다. 열거라는 말 그대로 관련 값들의 모음을 집합화 해놓은 것을 일컫습니다. 이를테면 계절, 월, 요일, 방향 등의 하나의 주제에 대한 관련 값들을 선언할 수 있겠습니다. 타입스크립트에서는 `enum` 키워드를 통해 선언할 수 있습니다.

이렇게요.

```ts
enum Day {
  Sunday,
  Monday,
  TuesDay,
  WendnesDay,
  ThursDay,
  Friday,
  Saturday,
}
```

타입스크립트에서 사용할 수 있는 열거형은 **숫자 열거형(Numeric enums)**, **문자열 열거형(String enums)**, **이종 열거형(Heterogeneous enums)** 등이 있을 수 있습니다. 이종 열거형은 숫자와 문자열을 섞어서 사용하는 부분인데 여기서는 다루지 않겠습니다.

## 숫자 열거형(Numeric enums)

타입스크립트의 열거형은 기본적으로 숫자 열거형이라고 할 수 있겠습니다.

```ts
enum Day {
  Sunday,
  Monday,
  TuesDay,
  WendnesDay,
  ThursDay,
  Friday,
  Saturday,
}

const sunday = Day.Sunday
const monday = Day.Monday

console.log(typeof sunday) // number
console.log(sunday) // 0
console.log(monday) // 1
```

초기 값을 선언하지 않으면 enum 에서는 기본적으로 첫번째 요소를 0으로 초기 값으로 할당하며 그 이후의 값은 1씩 증가합니다.

여기서 중간의 값 중 하나에 초기값을 지정해주면 어떨까요?

```ts
enum Day {
  Sunday,
  Monday = 500,
  TuesDay,
  WendnesDay,
  ThursDay,
  Friday,
  Saturday,
}

const monday = Day.Monday
const tuesDay = Day.TuesDay

console.log(monday) // 500
console.log(tuesDay) // 501
```

앞의 초기화된 값에서 다시 1이 증가하는 것을 볼 수 있습니다.
즉, 숫자 열거형은 아무것도 초기화 하지 않은 상태에서는 가장 처음의 요소가 0으로 초기 값이 할당되고, 앞의 초기화된 값을 기반으로 1씩 증가하는 방식으로 작동합니다.

다만, 초기화 되지 않은 열거형이 나온 경우에는 허용되지 않습니다.

```ts
enum E {
  A = calculate(),
  B, // error
}
```

해당 부분은 아래의 `계산된 멤버와 상수 멤버` 에서 더 자세히 다루어보겠습니다.

## 문자열 열거형 (String enums)

```ts
enum Season {
  Spring = "SPRING",
  Summer = "SUMMER",
  Fall = "FALL",
  Winter = "WINTER",
}
```

문자열 열거형은 숫자 열거형처럼 증가하는 기능은 없습니다. 다만, 숫자 열거형보다 값을 명확하게 명시하여 디버깅이 용이합니다.

```ts
const value = "SPRING" as Season

if (value === Season.Spring) {
  console.log(value) // 'SPRING'
}
```

다음과 같이 문자열 비교도 가능합니다.

## 타입과 값

```ts
enum Season {
  Spring = "SPRING",
  Summer = "SUMMER",
  Fall = "FALL",
  Winter = "WINTER",
}
```

다시 해당 예제를 살펴봅시다. 값의 관점에서 먼저 살펴보겠습니다.

위의 타입스크립트 코드 예제를 컴파일한 코드를 살펴봅시다.

```js
var Season
;(function (Season) {
  Season["Spring"] = "SPRING"
  Season["Summer"] = "SUMMER"
  Season["Fall"] = "FALL"
  Season["Winter"] = "WINTER"
})(Season || (Season = {}))
```

enum은 런타임에 객체로 변환되어 자바스크립트의 값으로 사용되는 특징이 있습니다.

```ts
type SeasonType = typeof Season // Season
type SeasonTypeKey = keyof typeof Season // Spring | Summer | Fall | Winter
```

타입의 관점에서는 enum 으로 선언된 `Season` 은 타입이며 `keyof`를 통해 `Spring | Summer | Fall | Winter` 와 같은 유니온 타입처럼 사용될 수 있습니다. 정리하자면, **enum은 타입과 값을 모두 정의할 수 있습니다.**

## 계산된 멤버와 상수 멤버

열거형 멤버는 상수 열거형 표현식으로 초기화됩니다. 이러한 이유는 컴파일 시점에 값을 계산할 수 있어야 열거형 멤버들이 실행 전에 값으로 결정되어 미리 평가된 값을 사용할 수 있기 때문입니다.

```ts
enum Status {
  SUCCESS = "success",
  FAILURE = "failure",
  PENDING = "pending",
}
```

이 경우 `SUCCESS`, `FAILURE`, `PENDING`은 상수 값으로 정의되어 컴파일 시점에 값이 결정날 수 있습니다.

상수 열거형 표현식은 다음과 같습니다.

1. 리터럴 열거형 표현식 (기본적으로 문자 리터럴 또는 숫자 리터럴)
2. 이전에 정의된 다른 상수 열거형 멤버에 대한 참조 (다른 열거형에서 시작될 수 있음)
3. 괄호로 묶인 상수 열거형 표현식
4. 상수 열거형 표현식에 단항 연산자 `+`, `-`, `~` 를 사용한 경우
5. 상수 열거형 표현식을 이중 연산자 `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 의 피연산자로 사용할 경우

상수 열거형 표현식 값이 `NaN` 이거나 `Infinity` 이면 컴파일 시점에 오류가 납니다.

만약 런타임 시점에 값이 계산되어 값이 결정되는 경우는 열거형에 사용이 불가능합니다.

1. 함수 호출을 사용한 초기화
2. 동적 계산을 사용한 초기화(let 을 사용한 변수로 초기화)
3. `enum`이 조건부로 초기화되는 경우

등이 있겠습니다.

## 역매핑(Reverse mappings)

숫자 열거형의 멤버는 열거형 값에서 열거형의 이름으로 역매핑이 가능합니다.

```ts
enum Day {
  Sunday,
  Monday,
  TuesDay,
  WendnesDay,
  ThursDay,
  Friday,
  Saturday,
}

const monday = Day.Monday
const dayOfMonday = Day[monday]

console.log(dayOfMonday) // 'Monday'
```

해당 타입스크립트 코드의 enum 선언부를 컴파일하면 다음과 같습니다.

```js
var Day
;(function (Day) {
  Day[(Day["Sunday"] = 0)] = "Sunday"
  Day[(Day["Monday"] = 1)] = "Monday"
  Day[(Day["TuesDay"] = 2)] = "TuesDay"
  Day[(Day["WendnesDay"] = 3)] = "WendnesDay"
  Day[(Day["ThursDay"] = 4)] = "ThursDay"
  Day[(Day["Friday"] = 5)] = "Friday"
  Day[(Day["Saturday"] = 6)] = "Saturday"
})(Day || (Day = {}))
```

정방향 매핑과 역방향 매핑을 모두 저장하는 형식으로 컴파일됨으로 역방향 매핑이 가능합니다. 다만 문자형 열거형에서는 불가능합니다.

```ts
enum Season {
  Spring = "SPRING",
  Summer = "SUMMER",
  Fall = "FALL",
  Winter = "WINTER",
}
```

```js
var Season
;(function (Season) {
  Season["Spring"] = "SPRING"
  Season["Summer"] = "SUMMER"
  Season["Fall"] = "FALL"
  Season["Winter"] = "WINTER"
})(Season || (Season = {}))
```

위의 문자열 열거형 타입스크립트 코드의 enum 부를 컴파일하면 정방향 매핑이 된 정보만 저장하기 때문입니다.

## const enum

const enum 은 `enum` 앞에 `const` 키워드를 붙이는 형식으로 사용할 수 있습니다. 그냥 enum 과 const enum 은 어떤 부분이 다를까요?
일반적인 열거형과 달리 const 키워드를 붙인 열거형은 **컴파일 시점에 값을 대체해버리는 방식**으로 동작합니다.

```ts
const enum Season {
  Spring = "SPRING",
  Summer = "SUMMER",
  Fall = "FALL",
  Winter = "WINTER",
}

const spring = Season.Spring
```

위의 타입스크립트 코드를 컴파일하게 되면 다음과 같이 생성됩니다.

```js
const spring = "SPRING" /* Season.Spring */
```

열거형 객체를 생성하는게 아니라 값으로 대체되기 때문에 실제 런타임에 사용되지 않는 열거형 관련 코드는 생성하지 않는 것을 볼 수 있습니다. 바꿔 말하자면 **트리셰이킹**이 가능합니다.
다만, 값으로 대치되어버리기 때문에 **역매핑은 불가**합니다.

---

### Reference

- [타입스크립트 핸드북 enum](https://typescript-kr.github.io/pages/enums.html)
- [TypeScript Deep Dive Enum](https://radlohead.gitbook.io/typescript-deep-dive/type-system/enums)
