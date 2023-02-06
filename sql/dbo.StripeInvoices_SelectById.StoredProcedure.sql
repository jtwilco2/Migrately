CREATE proc [dbo].[StripeInvoices_SelectById]
			@UserId int

			/* Test Code
			
			DECLARE @UserId int = 77
			EXECUTE [dbo].[StripeInvoices_SelectById] @UserId
			
			*/

as
begin
		
			SELECT TOP 1 InvoiceStart
						  ,InvoiceEnd 
			  FROM dbo.StripeInvoices
			  WHERE CustomerId IN ( SELECT Id
							FROM dbo.StripeCustomers
							WHERE UserId = @UserId)
			 ORDER BY Id DESC



end




GO
