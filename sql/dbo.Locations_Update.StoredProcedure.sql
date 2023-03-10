CREATE proc [dbo].[Locations_Update]
			@LocationTypeId int
           ,@LineOne nvarchar(255)
           ,@LineTwo nvarchar(255)
           ,@City nvarchar(255)
           ,@Zip nvarchar(50)
           ,@StateId int
           ,@Latitude float
           ,@Longitude float
           ,@CreatedBy int
           ,@ModifiedBy int
		   ,@Id int OUTPUT


/* --- TEST CODE ----

	Declare @Id int = 13;

	Declare @LocationTypeId int = 1
           ,@LineOne nvarchar(255) = 'LineOne update1'
           ,@LineTwo nvarchar(255) = 'LineTwo update1'
           ,@City nvarchar(255) = 'City update'
           ,@Zip nvarchar(50) = '1111'
           ,@StateId int = 1
           ,@Latitude float = 60.12
           ,@Longitude float = 60.12
           ,@CreatedBy int = 1
           ,@ModifiedBy int = 1

		SELECT *
		FROM [dbo].[Locations]
		WHERE Id = @Id
		
		Execute dbo.Locations_Update
								@LocationTypeId 
							   ,@LineOne 
							   ,@LineTwo 
							   ,@City 
							   ,@Zip 
							   ,@StateId 
							   ,@Latitude 
							   ,@Longitude 
							   ,@CreatedBy 
							   ,@ModifiedBy 
							   ,@Id OUTPUT
		SELECT *
		FROM [dbo].[Locations]
		WHERE Id = @Id

*/


as


BEGIN

		DECLARE @DateModified datetime2 = getutcdate();

		UPDATE [dbo].[Locations]
			SET [LocationTypeId] = @LocationTypeId
				,[LineOne] = @LineOne
				,[LineTwo] = @LineTwo
				,[City] = @City
				,[Zip] = @Zip
				,[StateId] = @StateId
				,[Latitude] = @Latitude
				,[Longitude] = @Longitude
				,[DateModified] = @DateModified
				,[CreatedBy] = @CreatedBy
				,[ModifiedBy] = @ModifiedBy
			WHERE Id = @Id


END 
GO
