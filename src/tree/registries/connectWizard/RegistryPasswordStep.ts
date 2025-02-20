/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureWizardPromptStep } from '@microsoft/vscode-azext-utils';
import { l10n } from 'vscode';
import { IConnectRegistryWizardContext } from './IConnectRegistryWizardContext';

export class RegistryPasswordStep extends AzureWizardPromptStep<IConnectRegistryWizardContext> {
    public async prompt(context: IConnectRegistryWizardContext): Promise<void> {
        const prompt: string = context.passwordPrompt || l10n.t('Enter your password');
        context.secret = await context.ui.showInputBox({ prompt, validateInput, password: true });
    }

    public shouldPrompt(context: IConnectRegistryWizardContext): boolean {
        return !!context.includePassword && !context.secret;
    }
}

function validateInput(value: string | undefined): string | undefined {
    if (!value) {
        return l10n.t('Password cannot be empty.');
    } else {
        return undefined;
    }
}
