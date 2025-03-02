---
category: "dev"
title: "테스트코드에 관하여"
featuredImage: "introduce-test-code-cover.png"
description: "프론트엔드에서 사용되는 테스트코드를 소개합니다"
date: "2025-03-02"
tags: ["test-code", "unit-test", "jest", "testing-library"]
---

## 들어가기에 앞서

해당 글은 테스트코드를 처음 도입하면서 겪었던 시행착오와 깨닫은 것들을 누군가에게 도움이 되고자 눌러 담은 글입니다. 글의 내용이 미비하거나 틀린 부분이 있을 수 있습니다. [해당 레포지토리](https://github.com/ppmyor/ppmyor.github.io)의 이슈에 수정되어야 할 내용을 등록해주시면 감사히 글에 반영하겠습니다.

## 시작하며

리팩토링과 더불어 기술 변경, 라이브러리 등의 안정적인 버전 업 등을 위해 많은 개발자들이 테스트코드를 필요로 합니다. 비즈니스가 커질수록 프로젝트의 규모가 커질수록 여러 의존성을 가진 테스트코드는 깨지기 쉽고 오히려 장애물이 되기 마련입니다. 더불어 프론트엔드로써 테스트코드 작성을 위한 갈피를 잡기 쉽지 않은데요. 어떻게 하면 조금 더 좋은 테스트코드를 작성 할 수 있을지 기술해봅니다.

의존성을 가지지 않으며 흐름 혹은 처리 절차를 명확하게 가지고 있는 좋게 설계된 비즈니스 로직은 테스트코드 작성을 용이하게 합니다. 여기서 비즈니스 로직이란 무엇일까요? chatGPT 에게 물어보니 다음과 같이 대답합니다.

![chatGPT 가라사대](https://github.com/user-attachments/assets/df5893c3-a5b9-4f8b-977b-48e933384843)

‘그렇다면 의존성을 잘 분리하여 비즈니스 로직만 잘 구현하면 테스트코드 도입이 쉽겠군요!’ 라고 말할 수 있겠습니다. 다만, 우리는 로직 테스트, 유닛 테스트 이외에도 UI 테스트 더 나아가 E2E 테스트까지 전반적인 흐름에 걸쳐 테스트가 필요합니다.

## 테스트를 왜 하나요?

우리가 항상 겪어 온 문제는 다음과 같습니다.

- 디자인이 나오길 기다리고, API가 나오길 기다립니다
- QA를 하면서 기획을 오해하고 누락된걸 알게됩니다
- 경우의 수가 많아질수록 재현도 어렵고 파악도 어렵습니다
- 재사용을 위해 공통 로직이나 디자인 시스템을 만든 후 그를 건드리면 옛 기능도 깨집니다

믿을만한 테스트와 함께라면 위의 문제 해결과 더불어 에러를 조기에 발견하거나, 로직 파악 등이 용이할테고 리팩토링 시에도 기존의 기능을 유지한채로 코드의 질만을 개선할 수 있습니다.

## 우리가 할 수 있는 테스트의 종류

우리가 할 수 있는 테스트는 다음과 같습니다.

- 유닛 테스트: `Jest`, `react-testing-library` …
- 복합 테스트: `vitest`, `react-testing-library` …
- E2E 테스트: `Cypress`, `Selenium`, `Playright` …

다음과 같은 도구를 통해 작은 코드 블록 단위의 `유닛 테스트`부터 `E2E 테스트`까지 전체적인 흐름을 테스트 할 수 있습니다. 테스트를 다양하게 할 수 있는 것은 알겠는데, 그러면 어떤 것들을 어떻게 테스트하면 좋을지에 대한 의문이 듭니다.

## 어떤 테스트케이스로 테스트를 하면 좋을까?

어떤 부분을 테스트 케이스로 잡고 테스트 하면 좋을까요?

- 기획자 가라사대 다음과 같이 말씀하셨습니다
  - 인풋 박스는 20자까지 입력되어야하고요
  - 특수문자는 (@, !, ^, &, \*) 만 입력 가능해요
  - 해당 부분은 값이 무조건 있어야해요 (빈 배열, undefinded, null 일 수 없어요)
  - 필수 값이면 테두리에 빨간색을 주세요
- 이건 변할 수 없는 규칙입니다
  - 물건 가격은 0원 이상이어야해요
  - 시작일보다 종료일은 뒤에 있을 수 없어요
  - 배송일자는 서비스 오픈일보다 이후여야해요
- 백엔드를 믿을 수 없어요
  - 페이로드로 넘어오는 이 타입 정말로 믿을 수 있습니까..?
- 그 외 모든 짜치는 경우들

다음과 같은 경우들을 잘 고려해서 테스트케이스를 정리할 수 있습니다. 또 구현이 완료된 기능의 버그들(QA..)의 유사성을 정리하여 테스트케이스를 추가할 수 있습니다.

그렇다면 이런 생각이 듭니다. ‘어디까지 상세하게 테스트케이스를 작성하라는거야?’ 어떤 테스트 건 결국은 불안감이 들지 않고 유지보수 시 고생보다는 이익이 큰 만큼만 테스트를 작성하면 됩니다. 너무 포괄적인가요?

- 가장 핵심적인 기능부터 테스트를 해보자
- 에러의 패턴을 분류하여 정리한 뒤 일관된 부분을 찾아보자
- 너무 상세한 구현체의 테스트보다 입력 값이 들어갔을 때 원하는 출력 값이 잘 도출되는지부터 고려해보자

다음과 같은 테스트케이스도 고려해보면 좋습니다.

- 데이터가 없을 때, 0일 때, undefinded 일 때, null 일 때, 옵셔널일 때 등의 테스트 케이스도 고려해보자

좋은 단위 테스트의 원칙으로는 `FIRST 원칙`도 있습니다. 관련해서 한번 찾아보시는 것도 추천합니다.

## 테스트

해당 글에서는 `jest`, `react-testing-library` 를 사용하며 다음과 같은 형식의 테스트코드를 작성합니다.

```ts
import useRangeDatePicker from "./useRangeDatePicker";

describe('useRangeDatePicker', () => {
  beforeEach(() => jest.useRealTimers());
  afterEach(() => {
    jest.clearAllTimers();
  });

	describe('오늘보다 시작일이 이전일 시', () => {
		it('초기값을 오늘로 설정한다.', () => {
			const { ... } = useRangeDatePicker();
			...
			expect(validStartDate).toEqual(today);
		});
	});
	describe('시작일보다 종료일이 이전일 시', () => {
		it('시작일을 오늘, 종료일을 내일로 설정한다.', () => {
			const { ... } = useRangeDatePicker();
			...
			expect(validStartDate).toEqual(today);
			expect(validEndDate).toEqual(tomorrow);
		});
	});
});
```

**describe**에 테스트에 대한 설명을 기재하고 **it** 에 테스트를 작성하는 형태입니다.
저는 describe를 2deps로 두었지만 이는 각 프로젝트의 특성에 맞게 변형될 수 있겠습니다.

**beforeEach**와 **afterEach**를 통해 각 테스트가 실행되기 전과 후에 수행될 일을 정의할 수 있으며 (해당 코드에서는 가짜 타이머를 설정하여 테스트의 목업 시간 데이터를 고정시킵니다) **beforeAll**과 **afterAll** 등을 통해 테스트가 시작되기 전과 후에 수행될 일을 정의할 수 있습니다.

값이 특정 조건을 충족하는지는 **expect**를 통해 기댓값을 설정할 수 있으며 여러 [matchers](https://jestjs.io/docs/expect) 를 통해 해당 기댓값의 유효성을 판단할 수 있습니다.

여기까지가 테스트코드의 기본 형태입니다.

### 컴포넌트 테스트

컴포넌트 테스트를 하기 위해서는 `react-testing-library` 를 사용합니다. 여기서 컴포넌트 테스트를 할 시 테스트 파일의 이름을 `tsx`, `jsx` 등으로 설정해주세요.

`react-testing-library`를 사용하여 컴포넌트를 테스트할 수 있는 방법은 많습니다. **render**, **act** 등 많은 [api](https://testing-library.com/docs/react-testing-library/api/)가 존재합니다.

여기서 가장 중요한 부분이 있습니다. 테스트를 할 컴포넌트는 **웹 표준성**을 잘 고려한 컴포넌트일수록 테스트가 용이해집니다.

다음과 같은 코드를 봅시다.

```tsx
export default function LoginForm({ userName }: { userName?: string }) {
  if (!userName) {
    return null
  }

  return (
    <div>
      <span>{userName}</span>
      <input type="text" />
      <input type="tel" />
      <div onClick={() => undefined}>로그인</div>
    </div>
  )
}
```

```ts
import { render, screen } from "@testing-library/react"
import LoginForm from "./LoginForm"

describe("LoginForm", () => {
  describe("유저 이름의 props가 없을 시", () => {
    it("화면에 표기되지 않는다", () => {
      const { container } = render(<LoginForm />)
      expect(container).toBeEmptyDOMElement()
    })
  })
  describe("로그인 버튼은", () => {
    it("로그인이라는 글자가 표기된다", () => {
      render(<LoginForm userName="안나" />)
      expect(screen.getByText("로그인")).toBeInTheDocument()
    })
  })
  describe("로그인 폼에는", () => {
    it("유저의 이름이 표기된다", () => {
      render(<LoginForm userName="안나" />)
      expect(screen.getByText("안나")).toBeInTheDocument()
    })
  })
})
```

다소 극단적으로 컴포넌트를 작성한 감이 있지만 해당 테스트코드도 모두 통과하고 이상한 부분이 없습니다.

다만, 컴포넌트를 다음과 같이 바꾼다면 조금 더 이해가 쉽고 명확한 테스트코드를 작성할 수 있습니다.

```tsx
export default function LoginForm({ userName }: { userName?: string }) {
  if (!userName) {
    return null;
  }

  return (
    <form onClick={ handleSubmit }>
      <h1>{userName}</h1>
      <input type="text" />
      <input type="tel" />
      <button type="submit">로그인</button>
    </form>
  );
```

```ts
import { render, screen } from "@testing-library/react"
import LoginForm from "./LoginForm"

describe("LoginForm", () => {
  describe("유저 이름의 props가 없을 시", () => {
    it("화면에 표기되지 않는다", () => {
      const { container } = render(<LoginForm />)
      expect(container).toBeEmptyDOMElement()
    })
  })
  describe("로그인 버튼은", () => {
    it("로그인이라는 글자가 표기된다", () => {
      render(<LoginForm userName="안나" />)
      expect(screen.getByRole("button")).toHaveTextContent("로그인")
    })
  })
  describe("로그인 폼에는", () => {
    it("유저의 이름이 표기된다", () => {
      render(<LoginForm userName="안나" />)
      expect(screen.getByRole("heading")).toHaveTextContent("안나")
    })
  })
})
```

추후 컴포넌트가 복잡해지고 같은 텍스트를 가진 태그가 여러개 생긴다면 **data-testid** 등으로 해당 영역이 컴포넌트에 존재하는지 판별할 수 밖에 없어지고, 테스트코드만을 보고는 해당 영역이 어느 부분인지 알 수 없으며 태그를 지칭하는 것이 직관적이지 않아 지양해야 하는 부분입니다. 더 여러가지 [쿼리](https://testing-library.com/docs/react-testing-library/cheatsheet/)를 사용할 수 있는 선택지가 많고 명확한 태그를 사용하는 것이 테스트코드를 작성하기에 용이합니다. 이는 스타일 테스트 시에도 마찬가지입니다. [aria](https://developer.mozilla.org/ko/docs/Web/Accessibility/ARIA) 를 활용하여 모달이 열려있는지는 `aria-expanded`로, input 이 빨간색인지는 `aria-invalid`로 보는 식입니다. 더불어 웹 접근성이 좋아지니 하지 않을 이유가 없겠죠.

### 리덕스를 사용한 컴포넌트의 테스트

리덕스를 사용한 컴포넌트의 테스트는 조금 더 복잡합니다. 컴포넌트를 리덕스의 [provider](https://redux.js.org/usage/writing-tests#connected-components)로 감싸주는 과정을 거쳐야합니다.

```ts
import { Provider } from "react-redux"
import { AppStore, RootState, setupStore } from "store/index"
import { RenderOptions, render } from "@testing-library/react"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
```

해당 코드를 활용하면 내부에 리덕스의 스토어에 있는 값 사용한 컴포넌트를 렌더하여 테스트 할 수 있습니다.

우선 리덕스에 counter를 증가, 감소 시키는 액션을 만들었습니다. 리덕스 관련 코드는 생략합니다.

카운터를 증감시키는 커스텀 훅을 작성했습니다.

```ts
import { useAppDispatch, useAppSelector } from "store/hooks"
import commonSlice from "store/common/slice"

export default function useCounter() {
  const dispatch = useAppDispatch()
  const counter = useAppSelector(({ common }) => common.counter)

  const handleIncrease = () => {
    dispatch(commonSlice.actions.setIncreaseCounter(counter))
  }

  const handleDecrease = () => {
    dispatch(commonSlice.actions.setDecreaseCounter(counter))
  }

  return { handleIncrease, handleDecrease, counter }
}
```

카운터 컴포넌트는 다음과 같습니다.

```tsx
import useCounter from "hooks/useCounter"

export default function Counter() {
  const { handleIncrease, handleDecrease, counter } = useCounter()

  return (
    <div>
      <h1>{counter}</h1>
      <button type="button" role="increase-counter" onClick={handleIncrease}>
        increase
      </button>
      <button type="button" role="decrease-counter" onClick={handleDecrease}>
        decrease
      </button>
    </div>
  )
}
```

여기서 테스트 케이스는 증가 버튼을 눌렀을 때 스토어의 카운터가 잘 증가 되는지, 감소 버튼을 눌렀을 때 스토어의 카운터가 잘 감소 되는지 확인하는 테스트코드를 작성합니다.

```ts
import { fireEvent, screen } from "@testing-library/react"
import { renderWithProviders } from "utils/renderWithProviders"
import type { TCommonState } from "store/common/slice"
import Counter from "./Counter"

describe("counter", () => {
  describe("increase 버튼을 눌렀을 시", () => {
    it("counter가 1 증가한다", async () => {
      const {
        store: { getState },
      } = renderWithProviders(<Counter />, {
        preloadedState: {
          common: {
            counter: 1,
          } as TCommonState,
        },
      })
      fireEvent.click(screen.getByRole("increase-counter"))
      const counter = getState().common.counter
      expect(counter).toEqual(2)
    })
  })
  describe("decrease 버튼을 눌렀을 시", () => {
    it("counter가 1 감소한다", () => {
      const {
        store: { getState },
      } = renderWithProviders(<Counter />, {
        preloadedState: {
          common: {
            counter: 1,
          } as TCommonState,
        },
      })
      fireEvent.click(screen.getByRole("decrease-counter"))
      const counter = getState().common.counter
      expect(counter).toEqual(0)
    })
  })
})
```

**fireEvent** 등 `react-testing-library`의 관한 부분은 생략합니다. [공식 문서](https://testing-library.com/docs/dom-testing-library/api-events/)에 잘 정리되어있습니다. 저희는 리덕스가 사용된 커스텀 훅이 포함되어있는 컴포넌트를 테스트하는 테스트코드를 어떻게 작성하는지에 집중합니다.

작성했던 유틸함수인 **renderWithProviders** 를 사용하면 다음과 같은 일을 할 수 있습니다.

- 스토어의 값을 가져올 수 있습니다. (**getState**)
- 해당 스토어의 값을 직접 지정 해줄 수 있습니다. (**preloadedState**)

우리는 counter 라는 스토어의 값을 직접 지정해주고 증감의 클릭 이벤트를 발생시켰을 시 스토어의 카운터가 증감하는지 확인할 수 있습니다.

### 리덕스를 사용한 커스텀 훅의 테스트

그렇다면 리덕스가 포함된 커스텀 훅을 사용한 컴포넌트가 아닌 오로지 커스텀 훅 만을 테스트하기 위해서는 어떻게 해야할까요?

기존에 작성된 커스텀 훅은 ui 로 명명된 컴포넌트를 무조건 지정해 렌더해주기 때문에 오로지 커스텀 훅 만을 테스트할 수 없습니다. 따라서 커스텀 훅만을 테스트 하기 위해서는 다음과 같은 유틸함수를 새로 만들어줍니다.

```ts
import { RenderOptions } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { Provider } from "react-redux"
import { AppStore, RootState, setupStore } from "store/index"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export default function renderHookWithProviders(
  hookFn: () => any,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )
  return {
    store,
    ...renderHook(hookFn, { wrapper: Wrapper, ...renderOptions }),
  }
}
```

여기서는 render가 아닌 **renderHook** 을 사용해줍니다. 리덕스를 사용하기 때문에 동일하게 [provider](https://redux.js.org/usage/writing-tests#connected-components)로 감싸주고 renderHook이 필요로 하는 바와 같이 맞추어 작성해줍니다. 첫번째 인자에는 함수를 넣어줍니다. 저는 any type을 리턴하는 hookFn이라고 명명된 함수를 넣어주었습니다. 해당 유틸함수를 활용하면 리덕스를 사용한 커스텀 훅만을 테스트할 수 있습니다.

위의 카운터 커스텀 훅을 이용해 테스트코드를 작성해보겠습니다.

```ts
import { act } from "@testing-library/react"
import type { TCommonState } from "store/common/slice"
import renderHookWithProviders from "utils/renderHookWithProviders"
import useCounter from "hooks/useCounter"

describe("counter", () => {
  describe("increase 버튼을 눌렀을 시", () => {
    it("counter가 1 증가한다", () => {
      const {
        result,
        store: { getState },
      } = renderHookWithProviders(useCounter, {
        preloadedState: {
          common: {
            counter: 1,
          } as TCommonState,
        },
      })
      act(() => result.current.handleIncrease())
      expect(result.current.counter).toEqual(2)
    })
  })
  describe("decrease 버튼을 눌렀을 시", () => {
    it("counter가 1 감소한다", () => {
      const { result } = renderHookWithProviders(useCounter, {
        preloadedState: {
          common: {
            counter: 2,
          } as TCommonState,
        },
      })
      act(() => result.current.handleDecrease())
      expect(result.current.counter).toEqual(1)
    })
  })
})
```

해당 유틸함수를 사용하면 기존 provider 컴포넌트를 감쌌던 유틸함수와 동일하게 **store** 와 **preloadedState** 사용이 가능합니다.

컴포넌트 단에서 click 이벤트를 발생시키는 것이 아니기 때문에 여기서는 **act** 를 사용해줍니다.

여기서 의문이 듭니다. 함수가 더 많아지면 result.current 를 구조 분해 하면 되는거 아니야? 중복된 코드를 줄이고 구조 분해 하고 싶어지는 욕망이 듭니다.

```ts
const { handleIncrease, counter } = result.current
```

이렇게 하면 handleIncrease 함수의 이벤트를 발생했을 때 counter 가 갱신되지 않습니다. 구조 분해 하지 않고 해당 부분을 작성해주세요.

## Fixture

테스트코드 픽스쳐에 대해 검색해보면 99%는 JUnit 과 같은 백엔드의 픽스쳐 구현 예제가 대다수입니다. 프론트엔드로써 사용할 수 있는 픽스쳐란 무엇일까요? 제가 이해한 바로는 픽스쳐는 붕어빵 틀 같은 개념입니다. 팥을 넣으면 팥붕, 슈크림을 넣으면 슈붕이지만 붕어빵이라는 형태는 변하지 않습니다. 객체의 형태는 변하지 않고 값만 변하여 목업 데이터로 사용할 수 있는 형태를 픽스쳐라고 일컫는다고 생각합니다.

**window.location** 에 대한 객체를 반환하는 간단한 픽스쳐를 한번 살펴보죠.

```ts
export class WindowLocationFixture<T> {
  constructor() {}

  create(item: T): void {
    global.window = Object.create(window)
    Object.defineProperty(window, "location", {
      value: item,
      writable: true,
    })
  }
}
```

create 함수에 location 과 관련된 인자를 넘겨주면 value에 할당되어 create를 호출했을 때 해당 값을 목업 데이터로 활용할 수 있습니다.

이렇게요.

```ts
const locationFixture = new WindowLocationFixture<{
  href: string
  search: string
}>()
locationFixture.create({ href: mockUrl, search: mockUrlQueryParams })
```

픽스쳐를 사용하는 다양한 이유 중 하나는 다음과 같습니다

- 코드가 중복되더라도 각 테스트 간의 목업 데이터가 공유되지 않아야할 때

각 테스트는 테스트끼리의 영향을 미치면 안됩니다. 하나의 테스트에 대한 목업 데이터를 수정했을 때 다른 테스트가 깨지지 않음을 보장할 수 있어야합니다. 따라서, 각 테스트별로 픽스쳐를 선언해 목업 데이터를 만들 수 있습니다. 물론 모든 것에 만능은 아니고 각 테스트별로 필요한 목업 데이터의 형태가 다르다면 적절치 않겠죠. 사용하기에 적절한 테스트코드 작성 시 픽스쳐를 선언해주는 것이 좋습니다. 관련 자세한 내용은 [해당 블로그](https://jojoldu.tistory.com/611)에도 잘 설명되어 있으니 참고해주세요. 어떤 상황에 어떻게 픽스쳐를 사용하면 좋을지 잘 나와있습니다.

## jest.spyOn() 과 jest.fn() 를 사용한 함수 모킹

해당 내용은 [해당 블로그](https://www.daleseo.com/jest-fn-spy-on/) 에 잘 정리되어있으니, 먼저 살펴보는 것을 권장합니다. 모킹이 어떤 개념인지에 대해서는 설명을 생략하겠습니다.

**jest.fn()** 이란 직접 함수를 넘기지 않고 가짜 함수를 넘기는 부분에 사용합니다. 의존성을 가져 함수를 넘겨줘야하나 해당하는 함수를 구현하여 넘겨주기가 부담스러울 때 사용하면 좋습니다. 해당 함수의 초기 리턴 값은 undefinded 이고 **mockReturnValue** 등을 사용하여 리턴 값을 지정해줄 수 있습니다.

**jest.spyOn()** 은 함수의 구현을 jest.fn()처럼 가짜 함수로 대체하지 않고, 해당 함수의 호출 여부, 그리고 어떻게 호출되었는지에 대해 필요할 때 사용할 수 있습니다. jest.spyOn() 에 대해서는 위 블로그의 예제를 가져와보겠습니다.

```ts
const calculator = {
  add: (a, b) => a + b,
}

const spyFn = jest.spyOn(calculator, "add")

const result = calculator.add(2, 3)

expect(result).toBe(5) //true
```

calculator라는 함수에 add 를 붙였고 해당 spyFn은 add 의 동작대로 잘 동작하는 것을 볼 수 있습니다.

우리는 이를 응용해서 useRouter 등의 부분에도 spyOn을 붙일 수 있습니다. 이렇게요.

```ts
const useRouter = jest.spyOn(require("next/router"), "useRouter")
```

해당 부분과 같이 사용하면 useRouter의 기능을 스파이할 수 있습니다. 여기에 어떻게 리턴 할 지 mockReturnValue를 통해 값을 한번 붙여 보겠습니다.

```ts
const useRouter = jest.spyOn(require("next/router"), "useRouter")
useRouter.mockReturnValue({
  query: mockQueryParamsObj,
})
```

이렇게 한다면 useRouter의 쿼리를 mockQueryParamsObj가 되도록 설정할 수 있습니다.

이외에도 [mockFn API](https://jestjs.io/docs/mock-function-api) 는 다양하게 사용할 수 있습니다.

주의할 점은 해당 커스텀훅에서 useRouter의 기능을 사용했다면 spyOn을 통해 useRouter을 선언해주어야 에러가 나지 않는다는 점입니다. 웬만하면 해당 부분들은 인자로 넘겨주던가 셋업 함수에서 한번 선언 후 재활용 하는 것이 정신건강에 이롭겠습니다.

## 테스트 시 지양점과 지향점

로직 및 컴포넌트의 구조 설계 시 의존성과 결합도에 대해 잘 생각해서 기초의 틀을 잡아 나가도록 하는 것이 좋습니다. 함수 모킹 등을 최소화 하고 props로 넘기는 형태의 구조도 테스트의 용이성에 도움을 줄 수 있습니다. 더불어 비동기 테스트 시 `await wait(3000);` 코드 등의 지연 시간을 직접 주는 부분을 지양해야합니다. 너무 길어지면 테스트코드가 오래 돌아가게 되며 너무 짧게 주면 성공해야 할 테스트코드가 실패하는 경우가 생길 수 있습니다. `waitFor` 같은 부분들을 잘 사용하도록 합시다.
