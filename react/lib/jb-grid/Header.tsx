import React, { type ReactNode } from 'react';
import type JBGridViewModel from './JBGridViewModel.js';
import { JBButton } from 'jb-button/react';
import { gridDictionary } from './i18n.js';
import { i18n } from 'jb-core/i18n';
import type { JBGridI18nConfig } from './types.js';
import 'jb-icons/close';
import 'jb-icons/filter';

type HeaderProps = {
  vm: JBGridViewModel,
  title: string,
  searchbarComponent?: ReactNode,
  headerEndComponents?: React.ReactNode[] | ReactNode,
  i18n?: JBGridI18nConfig | null
}
function Header(props: HeaderProps) {
  const { vm } = props;
  if (vm.headerSection == "SEARCH") {
    return (
      <div slot="header" style={{display:"flex", alignItems:"center"}}>
        <JBButton
          variant="ghost"
          aria-label={props.i18n?.messages?.closeFilters ?? gridDictionary.get(i18n, "closeFilters")}
          onClick={() => { vm.openMainHeaderSection(); }}
        >
          <jb-icon-close></jb-icon-close>
        </JBButton>
        {props.searchbarComponent}
      </div>
    );
  }
  return (
    <>
      <section slot="header-start">{props.title}</section>
      {Array.isArray(props.headerEndComponents) && props.headerEndComponents.map((component, index) => (
        <div slot="header-end" key={index}>{component}</div>
      ))}
      {!Array.isArray(props.headerEndComponents) && props.headerEndComponents && (
        <div slot="header-end">{props.headerEndComponents}</div>
      )}
      {props.searchbarComponent && (
        <JBButton
          slot="header-end"
          variant="ghost"
          aria-label={props.i18n?.messages?.openFilters ?? gridDictionary.get(i18n, "openFilters")}
          onClick={() => { vm.openSearchHeaderSection(); }}
        >
          <jb-icon-filter></jb-icon-filter>
        </JBButton>
      )}
    </>
  );
}

export default Header;
