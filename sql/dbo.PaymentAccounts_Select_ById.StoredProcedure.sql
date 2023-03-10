CREATE proc [dbo].[PaymentAccounts_Select_ById]
		@Id int
	/* -- Test Code --
	
		declare @Id int = 1
		execute dbo.PaymentAccounts_Select_ById @Id
	
	*/
as
begin

		SELECT Id
			  ,AccountId
			  ,PaymentTypeId
			  ,DateCreated
			  ,DateModified
			  ,CreatedBy
			  ,ModifiedBy
		FROM dbo.PaymentAccounts
		WHERE Id = @Id

end
GO
