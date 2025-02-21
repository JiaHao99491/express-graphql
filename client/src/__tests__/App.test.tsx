import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest.mock('@apollo/client', () => {
  const actual = jest.requireActual('@apollo/client');
  return {
    ...actual,
    useQuery: jest.fn(() => ({
      loading: '',
      error: '',
      data: {
        getCategories: [
          {
            __typename: 'Category',
            id: '67b83f9a33972669986ca3d4',
            name: '图书',
            products: [],
          },
        ],
        getProducts: [],
      },
    })),
    useMutation: jest.fn(() => []),
  };
});

test('demo', () => {
  expect(true).toBe(true);
});

test('渲染主页', () => {
  render(<App />);
  const productList = screen.getByText(/产品列表/);
  const productName = screen.getByText(/产品名称/);
  expect(productList).toBeInTheDocument();
  expect(productName).toBeInTheDocument();
});

test('测试用户选择产品分类', async () => {
  render(<App />);
  const productCategory = screen.getByText(/产品分类/);
  expect(productCategory).toBeInTheDocument();

  await userEvent.selectOptions(screen.getByRole('combobox'), '');
  expect(
    (screen.getByRole('option', { name: '选择分类' }) as HTMLOptionElement)
      .selected
  ).toBe(true);

  await userEvent.selectOptions(
    screen.getByRole('combobox'),
    '67b83f9a33972669986ca3d4'
  );
  expect(
    (screen.getByRole('option', { name: '图书' }) as HTMLOptionElement).selected
  ).toBe(true);
});

test('测试用户输入产品名称', async () => {
  const user = userEvent.setup();
  render(<App />);
  const productName = screen.getByRole('textbox');
  expect(productName).toBeInTheDocument();

  await user.type(productName, '红楼梦');
  expect((productName as HTMLInputElement).value).toBe('红楼梦');
});

test('快照测试', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
