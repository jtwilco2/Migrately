CREATE proc [dbo].[PaymentAccounts_Delete_ById]
		@Id int
as
begin
		DELETE FROM [dbo].[PaymentAccounts]
		WHERE Id = @Id
end

GO
