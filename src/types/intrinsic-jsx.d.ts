declare global {
  namespace JSX {
    // interface Element extends React.ReactElement<any, any> { }
    // interface ElementClass extends React.Component<any> {
    //     render(): React.ReactNode;
    // }
    // interface ElementAttributesProperty { props: {}; }
    // interface ElementChildrenAttribute { children: {}; }

    // // We can't recurse forever because `type` can't be self-referential;
    // // let's assume it's reasonable to do a single React.lazy() around a single React.memo() / vice-versa
    // type LibraryManagedAttributes<C, P> = C extends React.MemoExoticComponent<infer T> | React.LazyExoticComponent<infer T>
    //     ? T extends React.MemoExoticComponent<infer U> | React.LazyExoticComponent<infer U>
    //         ? ReactManagedAttributes<U, P>
    //         : ReactManagedAttributes<T, P>
    //     : ReactManagedAttributes<C, P>;

    // interface IntrinsicAttributes extends React.Attributes { }
    // interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> { }

    interface IntrinsicElements {
      resistor: { a: 1 }
    }
  }
}
