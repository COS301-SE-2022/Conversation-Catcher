import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { ApiAuthenticationServiceService } from '@conversation-catcher/api/authentication/service';
//yarn nx run api-pdf-manager-api-feature:test
@Resolver()
export class ApiAuthenticationApiFeatureResolver {
    constructor(
        // private otherService: ApiPdfManagerServiceFeatureService,
        private authService: ApiAuthenticationServiceService
    ) {
        this.errorObj = '0';
    }
    private errorObj;
    
    @Query(() => String)
    async logIn(@Args('email', { type: () => String }) email: string) {
        const id = await this.authService.logIn(email);

        if (id != undefined) {
            return id;
        }
        return this.errorObj;
    }

    @Mutation(() => String)
    async signUp(@Args('email', { type: () => [String] }) email: string) {
        const id = await this.authService.signUp(email);

        if (id != undefined) {
            return id;
        }
        return this.errorObj;
    }
}
