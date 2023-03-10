CREATE proc [dbo].[Clients_Delete]				
				@Id int
				,@ModifiedBy int

AS

/*----- TEST CODE -----

	DECLARE @Id int = '18'
			,@ModifiedBy int = '32'

	SELECT * FROM dbo.Clients
	WHERE Id = @Id

	EXECUTE [dbo].[Clients_Delete] @Id,@ModifiedBy

	SELECT * FROM dbo.Clients
	WHERE Id = @Id

	SELECT * FROM dbo.ClientAttorney
	WHERE ClientId = @Id

*/

BEGIN
	
	DELETE FROM dbo.ClientAttorney 
	WHERE ClientId = @Id

	DECLARE @dateNow datetime2 = getutcdate();

	UPDATE [dbo].[Clients]
	SET isActive = 0
		,[ModifiedBy] = @ModifiedBy
		,[DateModified] = @dateNow
	WHERE Id = @Id
	
END
GO
