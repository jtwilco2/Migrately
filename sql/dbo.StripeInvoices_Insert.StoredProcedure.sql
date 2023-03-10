CREATE proc [dbo].[StripeInvoices_Insert]
			@CustomerId varchar(50)
			,@InvoiceStart datetime2(7)
			,@InvoiceEnd datetime2(7)
			,@Id int output

			/* TEST CODE
			DECLARE @CustomerId varchar(50) = 'cus_N0opSiK8b3yg7m'
					,@InvoiceStart datetime2(7) = '12/26/2022'
					,@InvoiceEnd datetime2(7) = '12/26/2023'
					,@Id int = 0

			EXECUTE [dbo].[StripeInvoices_Insert] @CustomerId
													,@InvoiceStart
													,@InvoiceEnd
													,@Id

			*/

as
begin

			INSERT INTO dbo.StripeInvoices
					(
						CustomerId
						,InvoiceStart
						,InvoiceEnd
					)
			SELECT c.Id
					,@InvoiceStart
					,@InvoiceEnd

			FROM dbo.StripeCustomers as c
			WHERE CustomerId = @CustomerId

			SET @Id = SCOPE_IDENTITY();

end


GO
